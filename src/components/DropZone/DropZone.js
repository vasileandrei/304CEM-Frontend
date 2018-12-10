import React, { Component } from 'react';
import { Button, FormGroup, FormControl, ButtonGroup } from 'react-bootstrap';
import { SyncLoader } from 'react-spinners';
import { CSSTransition } from 'react-transition-group';
import { connect } from 'react-redux';
import { logout } from './../../actions/authActions';
import { setCurrentUser } from './../../actions/authActions';
import { store } from './../../index';
import PropTypes from 'prop-types';
import setAuthorizationToken from './../../utils/setAuthorizationToken';
import generateToken from './../../utils/generateToken';
import DropZoneReact from 'react-dropzone';
import uploadReq from './../../actions/axiosFileReq';
import fileIcon from './images/file.png';
import backButton from './images/arrow.png';
import './DropZone.scss';


class DropZone extends Component {

	constructor(props){
		super(props);

		this.state = {
			message: '',
			showClass: '',
			currentFile: '',
            title: '',
            description: '',
            location: '',
            buttonValue: '',
            price: '',
			buttonEnable: true,
            loading: false,
			show: true,
            appearLogin: true,
            uploadedFiles: []
		};

		this.showFlashMessage = (event) => this._showFlashMessage(event);
	}

	// eslint-disable-next-line no-unused-vars
	_showFlashMessage = (event) => {
		this.setState({
			show: !this.state.show,
			showClass: (!this.state.show ? 'fadeOut': 'fadeOut2')
		});
	}

    onDrop = (file) => {
        const numberOfFiles = file.length;
        this.showFlashMessage();
        this.setState({
            message: `Uploading ${numberOfFiles} file(s)`,
            loading: true
        });
        this.uploadFile(file);
    }

    // handle changes in the four fields
    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.id]: event.target.value
        });

    }

    goHome = () => {
        window.location.replace('/');
    }

    handleRadioButtons = (event) => {
        this.setState({
            condition: event.target.value
        });
    }

    handleDropdown = (event) => {
        this.setState({
            category: event.target.value
        });
    }

    handleTags = (tags) => {
        this.setState({
            tags
        });
    }

    onSelect = (event) => {
        this.setState({
            condition: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.showFlashMessage();
        if (!this.state.buttonEnable) {
            this.setState({
                message: 'Please compelte the entire form'
            });
        } else {
            this.setState({
                loading: true,
                message: 'Processing your request'
            });
            this.upload();
        }
    }

    async appendToRedux(fileInfo) {
        // Remember user
        const index = this.props.auth.user.userInfo.files.length;
        this.props.auth.user.userInfo.files[index] = fileInfo;
        const userInfo = this.props.auth.user;

        // Logout
        this.props.logout();

        // Generate and restore Redux store, local storage and session storage
        const newToken = await generateToken(userInfo);
        localStorage.setItem('jwtToken', newToken);
        setAuthorizationToken(userInfo);
        store.dispatch(setCurrentUser(userInfo));
    }

    async uploadFile(file) {
        const response = await uploadReq('file_upload', file);
        this.setState({
            uploadedFiles: response
        });
        this.setState({
            loading: false
        });
    }

    async upload() {
        const messageIndex = 0;
        const redirectIndex = 1;

        const condition = this.state.condition;
        const title = this.state.title;
        const description = this.state.description;
        const location = this.state.location;
        const price = this.state.price;
        const category = this.state.category;
        const files = this.state.uploadedFiles;

        const response = await uploadReq('upload', files, condition, title,
        description, location, price, category);
        if (response) {
            this.showFlashMessage();
            this.setState({
                message: response[messageIndex]
            });
            if (response[redirectIndex] === true) {
                console.log('redirect now');
            }
            // this.appendToRedux(currentFile);
            // if (response[redirectIndex]){
            //     window.location.replace(`/getFile/${currentFile._id}`);
            // }
        } else {
            this.setState({
                message: 'Internal server problems'
            });
        }
        this.setState({
            loading: false
        });
    }

    render = () => {
        return (
            <CSSTransition
                    in={this.state.appearLogin}
                    appear={true}
                    timeout={300}
                    classNames="fade"
                    >
                <div className="body">
                    <form className="additem-form" onSubmit={this.handleSubmit}>
                        <img src={backButton} onClick={this.goHome}
                        alt="back to login button" className="backButton"></img>
                        <h1 className="dropZoneTitle">Add a new item</h1>
                        <ButtonGroup onClick={this.handleRadioButtons} className='radioButtonDiv'>
                            <Button value='perfect'>Perfect
                                <div className={this.state.condition === 'perfect' ? 'radioShadow' : ''}/>
                            </Button>
                            <Button value='good'>Good
                                <div className={this.state.condition === 'good' ? 'radioShadow' : ''}/>
                            </Button>
                            <Button value='used'>Used
                                <div className={this.state.condition === 'used' ? 'radioShadow' : ''}/>
                            </Button>
                        </ButtonGroup>
                        <FormGroup className="inputField" controlId="title">
                            <FormControl className="input" type="text" placeholder="Product Title"
                            value={this.state.title} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup className="inputField" controlId="description">
                            <FormControl className="input textArea" type="textarea" placeholder="Description"
                            value={this.state.description} onChange={this.handleChange} componentClass="textarea" />
                        </FormGroup>
                        <FormGroup className="inputField" controlId="location">
                            <FormControl className="input" type="text" placeholder="Location"
                            value={this.state.password} onChange={this.handleChange} />
                        </FormGroup>
                        <FormGroup className="inputField" controlId="price">
                            <FormControl className="input" type="text" placeholder="Price in £"
                            value={this.state.price} onChange={this.handleChange} />
                        </FormGroup>
                        <DropZoneReact id="uploadFile"className="drop-zone" name="image" onDrop={this.onDrop}>
                            <div>
                                <img alt="drop zone file icon" src={fileIcon}/>
                                <h3>Add a photo</h3>
                            </div>
                        </DropZoneReact>
                        <select className='dropDown' value={this.state.category} onChange={this.handleDropdown}>
                            <option className='dropDownInput' value="">Please select a category</option>
                            <option className='dropDownInput' value="Fashion and Accesories">Fashion and Accesories</option>
                            <option className='dropDownInput' value="Home and Garden">Home and Garden</option>
                            <option className='dropDownInput' value="Electronics">Electronics</option>
                            <option className='dropDownInput' value="Baby and Child">Baby and Child</option>
                            <option className='dropDownInput' value="Sports, Leisure and Games">Sports, Leisure and Games</option>
                            <option className='dropDownInput' value="Movies, Books and Music">Movies, Books and Music</option>
                            <option className='dropDownInput' value="Cars and Motos">Cars and Motos</option>
                            <option className='dropDownInput' value="Other">Other</option>
                        </select>
                        <br /> <br /> <br />
                        <div className="display">
                            <SyncLoader sizeUnit={'px'} size={10}
                            color={'rgba(113, 137, 255, 0.9)'} loading={this.state.loading} />
                            <br />
                            <div id="externalMessage" className={this.state.showClass}>
                                {this.state.message}
                            </div>
                            <Button className="button" onClick={this.handleSubmit}>Publish</Button>
                        </div>
                    </form>
                </div>
            </CSSTransition>
        );
    }
}

DropZone.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, { logout })(DropZone);
