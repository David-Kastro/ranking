import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as MsgActions } from "../../store/ducks/_Menssage";

class MsgDialog extends Component {

    closeDialog() {
        this.props.HideMsg()
    }

    render() {

        const { msg } = this.props;

        return (
            <Dialog
                open = {msg.show}
                maxWidth = "xs"
            >
                <DialogTitle>{msg.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{msg.msg}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => this.closeDialog()} color={msg.color}>
                        {msg.closeText}
                    </Button>
                    <Button onClick={() => msg.actionHandler()} color={msg.color} variant='contained' autoFocus>
                        {msg.actionText}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}


const mapStateToProps = state => ({
  msg: state.msgReducers,
});

const mapDispatchToProps = dispatch => bindActionCreators(MsgActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MsgDialog);