// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import compose from 'recompose/compose';
import { withRouter } from 'react-router';
import slugg from 'slugg';
import { CHANNEL_SLUG_BLACKLIST } from 'shared/slug-blacklists';
import { withApollo } from 'react-apollo';
import { closeModal } from 'src/actions/modals';
import { addToastWithTimeout } from 'src/actions/toasts';
import { throttle } from 'src/helpers/utils';
import { getChannelBySlugAndCommunitySlugQuery } from 'shared/graphql/queries/channel/getChannel';
import type { GetChannelType } from 'shared/graphql/queries/channel/getChannel';
import type { GetCommunityType } from 'shared/graphql/queries/community/getCommunity';
import createChannelMutation from 'shared/graphql/mutations/channel/createChannel';
import { track, events, transformations } from 'src/helpers/analytics';
import type { Dispatch } from 'redux';

import ModalContainer from '../modalContainer';
import { TextButton, Button } from '../../buttons';
import { modalStyles, UpsellDescription } from '../styles';
import {
  Input,
  UnderlineInput,
  TextArea,
  Error,
  Checkbox,
} from '../../formElements';
import { Form, Actions } from './style';

const MAX_SLUG_LENGTH = 24;
const MAX_NAME_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 140;

type State = {
  name: string,
  nameError: ?string,
  slug: string,
  slugError: ?string,
  description: string,
  descriptionError: ?string,
  isPrivate: boolean,
  addExistingMembers: boolean,
  permissionSetting: 'members' | 'team',
  isCreating: boolean,
  createError: ?string,
};

type Props = {
  client: Object,
  dispatch: Dispatch<Object>,
  isOpen: boolean,
  community: GetCommunityType,
  createChannel: Function,
};

class CreateChannelModal extends React.Component<Props, State> {
  constructor() {
    super();

    this.state = {
      name: '',
      nameError: '',
      slug: '',
      slugError: '',
      description: '',
      descriptionError: '',
      isPrivate: false,
      addExistingMembers: true,
      permissionSetting: 'members',
      isCreating: false,
      createError: '',
    };

    this.checkSlug = throttle(this.checkSlug, 500);
  }

  componentDidMount() {
    const { community } = this.props;
    track(events.CHANNEL_CREATED_INITED, {
      community: transformations.analyticsCommunity(community),
    });
  }

  close = () => {
    this.props.dispatch(closeModal());
  };

  changeName = e => {
    const name = e.target.value;
    const lowercaseName = name.toLowerCase().trim();
    const slug = slugg(lowercaseName);

    if (name.length > MAX_NAME_LENGTH) {
      return this.setState({
        nameError: 'Channel names can be up to 20 characters long.',
      });
    }

    this.setState({
      name,
      slug,
      nameError: '',
    });

    // $FlowFixMe
    return this.checkSlug(slug);
  };

  changeSlug = (val: string) => {
    const lowercaseSlug = val.toLowerCase().trim();
    const slug = slugg(lowercaseSlug);

    if (slug.length > MAX_SLUG_LENGTH) {
      return this.setState({
        slugError: 'Channel slugs can be up to 24 characters long.',
      });
    }

    this.setState({
      slug,
      slugError: '',
    });

    // $FlowFixMe
    this.checkSlug(slug);
  };

  checkSlug = (slug: string) => {
    const communitySlug = this.props.community.slug;

    if (CHANNEL_SLUG_BLACKLIST.indexOf(slug) > -1) {
      return this.setState({
        slug,
        slugError: 'That channel slug is already taken.',
      });
    }

    // check the db to see if this channel slug exists
    this.props.client
      .query({
        query: getChannelBySlugAndCommunitySlugQuery,
        variables: {
          channelSlug: slug,
          communitySlug,
        },
      })
      .then(({ data }: { data: { channel: GetChannelType } }) => {
        if (CHANNEL_SLUG_BLACKLIST.indexOf(this.state.slug) > -1) {
          return this.setState({
            slugError: 'That channel slug is already taken.',
          });
        }

        if (!data.loading && data && data.channel && data.channel.id) {
          return this.setState({
            slugError: 'That channel slug is already taken.',
          });
        }

        return this.setState({
          slugError: '',
        });
      })
      .catch(err => {
        // do nothing
      });
  };

  changeDescription = (description: string) => {
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      return this.setState({
        descriptionError: 'Oops, that’s more than 140 characters.',
      });
    }

    return this.setState({
      description,
      descriptionError: '',
    });
  };

  togglePrivate = () => {
    this.setState(state => ({
      isPrivate: !state.isPrivate,
      /*
        If the user has already set addExistingMembers to false, then we don't need to 
        toggle its value if the user also changes the private state. However, if the setting
        to add existing members is enabled, it must be disabled if the user changes the privacy
        of the channel to private.
      */
      addExistingMembers: !state.addExistingMembers
        ? !state.isPrivate
        : state.addExistingMembers,
    }));
  };

  toggleAddExistingMembers = () => {
    this.setState(state => ({
      addExistingMembers: !state.addExistingMembers,
    }));
  };

  setPermissionSettings = (val: 'members' | 'team') => {
    this.setState({
      permissionSetting: val,
    });
  };

  create = (e: any) => {
    e.preventDefault();

    const {
      name,
      slug,
      description,
      isPrivate,
      slugError,
      nameError,
      descriptionError,
    } = this.state;
    const { community } = this.props;

    // if an error is present, ensure the client cant submit the form
    if (nameError || descriptionError || slugError) {
      this.setState({
        createError: 'Please fix any errors above before creating.',
      });

      return;
    }

    // clientside checks have passed
    this.setState({
      createError: '',
      isCreating: true,
    });

    // all non-private channels should be set to default for now
    const isDefault = !isPrivate;

    // create the mutation input
    const input = {
      communityId: community.id,
      name,
      slug,
      description,
      isPrivate,
      isDefault,
    };

    this.props
      .createChannel(input)
      .then(() => {
        this.close();
        this.props.dispatch(
          addToastWithTimeout('success', 'Channel successfully created!')
        );
        return;
      })
      .catch(err => {
        this.setState({
          isCreating: false,
        });

        this.props.dispatch(addToastWithTimeout('error', err.toString()));
      });
  };

  render() {
    const { isOpen, community } = this.props;

    const {
      name,
      nameError,
      slug,
      slugError,
      description,
      descriptionError,
      isPrivate,
      addExistingMembers,
      permissionSetting,
      isCreating,
      createError,
    } = this.state;

    const submittable =
      name && !nameError && !slugError && (description && !descriptionError);

    return (
      <Modal
        /* TODO(@mxstbr): Fix this */
        ariaHideApp={false}
        isOpen={isOpen}
        contentLabel={'Create a Channel'}
        onRequestClose={this.close}
        shouldCloseOnOverlayClick={true}
        style={modalStyles(420)}
        closeTimeoutMS={330}
      >
        <ModalContainer title={'Create a Channel'} closeModal={this.close}>
          <Form>
            <Input
              defaultValue={name}
              onChange={this.changeName}
              autoFocus={true}
            >
              Channel Name
            </Input>

            {nameError && <Error>{nameError}</Error>}

            <UnderlineInput
              defaultValue={slug}
              onChange={e => this.changeSlug(e.target.value)}
            >
              {`/${community.slug}/`}
            </UnderlineInput>

            {slugError && <Error>{slugError}</Error>}

            <TextArea
              defaultValue={description}
              onChange={e => this.changeDescription(e.target.value)}
            >
              Add optional description (140 characters)
            </TextArea>

            {descriptionError && <Error>{descriptionError}</Error>}

            <Checkbox
              checked={isPrivate}
              onChange={this.togglePrivate}
              dataCy="create-channel-modal-toggle-private-checkbox"
            >
              Private channel
            </Checkbox>

            <UpsellDescription>
              Private channels protect all conversations and messages, and all
              new members must be manually approved.
            </UpsellDescription>

            {!isPrivate && (
              <React.Fragment>
                <Checkbox
                  checked={addExistingMembers}
                  onChange={this.toggleAddExistingMembers}
                  dataCy="create-channel-modal-toggle-add-existing-members-checkbox"
                >
                  Add current members to new channel
                </Checkbox>

                <UpsellDescription>
                  Automatically add all existing community members as
                  subscribers to your newly created channel.
                </UpsellDescription>

                <Checkbox
                  checked={permissionSetting === 'members'}
                  onChange={() => this.setPermissionSettings('members')}
                  dataCy="create-channel-modal-toggle-members-permission-setting-checkbox"
                >
                  All community members
                </Checkbox>

                <Checkbox
                  checked={permissionSetting === 'team'}
                  onChange={() => this.setPermissionSettings('team')}
                  dataCy="create-channel-modal-toggle-team-permission-setting-checkbox"
                >
                  Only team members
                </Checkbox>

                <UpsellDescription>
                  Who should be allowed to create new conversations in this
                  channel?
                </UpsellDescription>
              </React.Fragment>
            )}

            <Actions>
              <TextButton onClick={this.close} color={'warn.alt'}>
                Cancel
              </TextButton>
              <Button
                disabled={!submittable}
                loading={isCreating}
                onClick={this.create}
              >
                Create
              </Button>
            </Actions>

            {createError && <Error>{createError}</Error>}
          </Form>
        </ModalContainer>
      </Modal>
    );
  }
}

const map = state => ({
  currentUser: state.users.currentUser,
  isOpen: state.modals.isOpen,
});
export default compose(
  // $FlowIssue
  connect(map),
  withApollo,
  createChannelMutation,
  withRouter
)(CreateChannelModal);
