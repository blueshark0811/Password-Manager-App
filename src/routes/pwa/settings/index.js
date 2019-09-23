import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import IntlMessages from "Util/IntlMessages";
import PinInput from "react-pin-input";
import { 
  Label,
  FormGroup,
  Row, 
  Card, 
  CardBody,
  CardTitle, 
  Button, 
  Jumbotron,
  Modal,
  ModalHeader,
  ModalBody,  
  ModalFooter,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";
import ReactTable from "react-table";
import {
  AvForm,
  AvGroup,
  AvInput,
  AvFeedback,
  AvField
} from "availity-reactstrap-validation";
import { Colxx, Separator } from "Components/CustomBootstrap";
import DataTablePagination from "Components/DataTables/pagination";
import { ToastsContainer, ToastsStore} from 'react-toasts';

import { 
  registerUser,
  getUserlist,
  updateUser,
  deleteUser,
  createPin,
  updatePin,
  getPin,
  resetPin
} from "Redux/actions";

let  dataTableColumns;
class SettingsLayout extends Component {
   constructor(props) {
    super(props);
    this.state = {
      createpinmodal: false,
      deletemodal: false,
      editmodal: false,
      ispasswordtype: false,
      iswebsite: false,
      passwordtype: 'Generic',
      website: '',
      username: '',
      password: '',
      location: '',
      _id: '',
      data: [],
      loading: true,
      modaltype: '',
      pin1: '',
      pin2: '',
      pin: ''
    };
    this.submitUser = this.submitUser.bind(this);
    this.edittoggle = this.edittoggle.bind(this);
    this.togglepasswordtype = this.togglepasswordtype.bind(this);
    this.togglewebsite = this.togglewebsite.bind(this);

    this.changepasswordtype = this.changepasswordtype.bind(this);
    this.changewebsite = this.changewebsite.bind(this);
    this.changepassword = this.changepassword.bind(this);
    this.changeusername = this.changeusername.bind(this);
    this.changelocation = this.changelocation.bind(this);
    this.onupdate = this.onupdate.bind(this);
    this.ondelete = this.ondelete.bind(this);

    this.deletepassword = this.deletepassword.bind(this);
    this.deletetoggle = this.deletetoggle.bind(this);

    this.createpin = this.createpin.bind(this);
    this.createpintoggle = this.createpintoggle.bind(this);

    this.onChangePin1Create = this.onChangePin1Create.bind(this);
    this.onChangePin2Create = this.onChangePin2Create.bind(this);
    this.onResetPin = this.onResetPin.bind(this);
    this.props.getUserlist();
    this.props.getPin();
    dataTableColumns = [
        {
          Header: "Location",
          accessor: "location",
          Cell: props => <p className="list-item-heading">{props.value}</p>
        },
        {
          Header: "Username",
          accessor: "username",
          Cell: props => <p className="text-muted">{props.value}</p>
        },
        {
          Header: "Password",
          accessor: "password",
          Cell: props => <p className="text-muted">*************</p>
        },
        {
          Header: "Password Type",
          accessor: "passwordtype",
          Cell: props => <p className="text-muted">{props.value}</p>
        },
        {
          Header: '',
          accessor: '_id',
          Cell: props => 
          <div>
            <Button color='' className="action-button" onClick={()=>this.onupdate(props.value)}><i className='simple-icon-pencil'></i></Button>
            <Button color='' className="action-button" onClick={()=>this.ondelete(props.value)}><i className='simple-icon-trash'></i></Button>
          </div>
        }
    ];
  }

  onChangePin1Create(val) {
    this.setState({
      pin1: val
    });
  }
  onChangePin2Create(val) {
    this.setState({
      pin2: val
    });
  }
  createpintoggle() {
    this.setState({
      createpinmodal: !this.state.createpinmodal,
    });
  }
  createpin() {
    if(this.state.pin1 == this.state.pin2){
      // alert(this.state.pin1);
      this.props.createPin({username: 'admin', pin: this.state.pin1});
      ToastsStore.success('PIN is created Successfully.');
      this.setState({
        createpinmodal: !this.state.createpinmodal,
      });

    }
    else if(this.state.pin1 == this.state.pin) {
      this.props.updatePin({username: 'admin', pin: this.state.pin2});
      ToastsStore.success('PIN is updated Successfully.');

      this.setState({
        createpinmodal: !this.state.createpinmodal,
      });
    }
    else 
      ToastsStore.error('Enter Pin correctly.');
    
  }
  ondelete(id) {
    
    this.setState({
      deletemodal: true,
      _id: id
    });
  }
  onupdate(id) {
    let selectedUser;
    for(let index in this.state.data)
      if(this.state.data[index]._id == id) {
        selectedUser = this.state.data[index];
        break;
      }
    console.log(selectedUser)
    this.setState({
      editmodal: !this.state.editmodal,
      modaltype: 'update',
      password: selectedUser.password,
      passwordtype: selectedUser.passwordtype,
      website: selectedUser.website,
      username: selectedUser.username,
      location: selectedUser.location,
      _id: selectedUser._id
    });
  }
  submitUser() {
    var url = process.env.NODE_ENV == 'development' ? 'http://localhost:4040':'http://45.63.27.167:4040';
    if(this.state.passwordtype == 'Google Auth' || this.state.passwordtype == 'Facebook Auth') {
      location.href = url + '/auth/facebook';
    }
    if(this.state.location != '' && this.state.password != '' && this.state.username != ''){
      if(this.state.modaltype == 'add'){
        this.props.registerUser(this.state, this.props.history);
        ToastsStore.success('User is created Successfully.');
      }
      else {
        this.props.updateUser(this.state);
        ToastsStore.success('User is updated Successfully.');
      }
      this.setState({
        editmodal: !this.state.editmodal
      });
    }
    else 
      ToastsStore.error('All fields are required.');

  }
      
  edittoggle() {
    this.setState({
      editmodal: !this.state.editmodal,
      modaltype: 'add',
      passwordtype: 'Generic',
      website: '',
      username: '',
      password: '',
      location: '',
    });
  }
  deletetoggle() {
    this.setState({
      deletemodal: !this.state.deletemodal,
      _id: ''
    });
  }
  deletepassword() {
    console.log('here is selectedpassword', this.state._id);
    this.props.deleteUser(this.state._id, this.props.history)
    ToastsStore.success('User is deleted Successfully.');


    this.setState({
      deletemodal: !this.state.deletemodal,
      _id: ''
    });
  }
  togglepasswordtype() {
    this.setState(prevState => ({
      ispasswordtype: !prevState.ispasswordtype
    }));
  }
  togglewebsite() {
    this.setState(prevState => ({
      iswebsite: !prevState.iswebsite
    }));
  }
  changepassword(event) {
    let currentpassword = event.target.value;
    this.setState(prevState => ({
      password: currentpassword
    }));
  }
  changeusername(event) {
    let currentusername = event.target.value;
    this.setState(prevState => ({
      username: currentusername
    }));
  }
  changelocation(event) {
    let currentlocation = event.target.value;
    console.log(currentlocation);
    this.setState(prevState => ({
      location: currentlocation
    }));
  }
  changepasswordtype(event) {
    let currentpasswordtype = event.target.value;

    console.log(currentpasswordtype);
    this.setState(prevState => ({
      passwordtype: currentpasswordtype
    }));
  }
  changewebsite(event) {
    let currentwebsite = event.target.value;
    this.setState(prevState => ({
      website: currentwebsite
    }));
  }
  onResetPin() {
    this.props.resetPin();
    ToastsStore.success('PIN is reseted Successfully.');
  }
  componentWillReceiveProps(nextProps) {
    this.setState(prevState => ({
      data: nextProps.userList,
      pin: nextProps.pin,
      loading: false
    }));
  }
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
          
              <h1>Password Management</h1>
              <Button color="primary" className="mb-2 create-pin"  onClick={this.createpintoggle}>
                  {this.state.pin == '' ? 'Create Pin': 'Update Pin' }
              </Button>
            <Separator className="mb-5" />
          </Colxx>
          <Colxx xxs="12">
            <Card className="mb-4">
              <CardBody>
                
                <ReactTable
                  data={this.state.data}
                  columns={dataTableColumns}
                  defaultPageSize={5}
                  // filterable={true}
                  showPageJump={true}
                  PaginationComponent={DataTablePagination}
                  showPageSizeOptions={true}
                />

                <Button color="primary" className="mt-2" onClick={this.edittoggle}>
                    Add New Password
                </Button>
                <Modal isOpen={this.state.deletemodal} toggle={this.deletetoggle}>
                    <ModalHeader toggle={this.deletetoggle}>
                      Delete Password
                    </ModalHeader>
                    <ModalBody>
                      Are you sure to delete this password?
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.deletepassword}>
                        Ok
                      </Button>{" "}
                      <Button color="secondary" onClick={this.deletetoggle}>
                        Cancel
                      </Button>
                    </ModalFooter>
                  </Modal>
                  <Modal isOpen={this.state.createpinmodal} toggle={this.createpintoggle}>
                    <ModalHeader toggle={this.createpintoggle}>
                      {this.state.pin == '' ? 'Create Pin': 'Update Pin' }
                    </ModalHeader>
                    <ModalBody>
                      <h2 className="pin-title">{this.state.pin == '' ? 'Enter your Pin': 'Enter your Old Pin' }</h2>
                      <PinInput
                        length={4}
                        focus
                        secret
                        ref={p => (this.createpin1 = p)}
                        type="text"
                        onChange={this.onChangePin1Create}
                      />
                      <h2 className="pin-title">{this.state.pin == '' ? 'Re-Enter your Pin': 'Enter your New Pin' }</h2>
                      <PinInput
                        length={4}
                        focus
                        secret
                        ref={p => (this.createpin2 = p)}
                        type="text"
                        onChange={this.onChangePin2Create}
                      />
                    </ModalBody>
                    <ModalFooter>
                      <Button color="primary" onClick={this.createpin}>
                        Save
                      </Button>{" "}
                      <Button color="secondary" onClick={this.createpintoggle}>
                        Cancel
                      </Button>
                      {this.state.pin == '' ? '': 
                      <Button color="blue" onClick={this.onResetPin}>
                        Reset
                      </Button>
                       }
                      
                    </ModalFooter>
                  </Modal>

                <Modal isOpen={this.state.editmodal} toggle={this.edittoggle}>
                    <ModalHeader toggle={this.edittoggle}>
                      {this.state.modaltype == 'add' ? 'Add Password': 'Update Password'}
                    </ModalHeader>
                    <AvForm className="mb-5 row">
                    
                    <ModalBody>
                    
                        <Colxx sm={12}>
                          <AvGroup className="modal_select_form_group">
                            <Label className="av-label modal_select_form_label" for="add_password_type">
                              Password Type
                            </Label>
                            <Dropdown
                                isOpen={this.state.ispasswordtype}
                                toggle={this.togglepasswordtype}
                                
                                className="mb-5"
                                id="add_password_type"
                              >
                              <DropdownToggle caret color="secondary" outline>
                                {this.state.passwordtype}
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem value="Generic" onClick={this.changepasswordtype}>
                                  Generic
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem value="Tripadvisor" onClick={this.changepasswordtype}>
                                  Tripadvisor
                                </DropdownItem>
                                <DropdownItem value="Yelp" onClick={this.changepasswordtype}>
                                  Yelp
                                </DropdownItem>
                                <DropdownItem value="Opentable" onClick={this.changepasswordtype}>
                                  Opentable
                                </DropdownItem>
                                <DropdownItem value="Zomato" onClick={this.changepasswordtype}>
                                  Zomato
                                </DropdownItem>
                                <DropdownItem value="Thefork" onClick={this.changepasswordtype}>
                                  Thefork
                                </DropdownItem>
                                <DropdownItem value="Quandoo" onClick={this.changepasswordtype}>
                                  Quandoo
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem value="Google Auth" onClick={this.changepasswordtype}>
                                  Google Auth
                                </DropdownItem>
                                <DropdownItem value="Facebook Auth" onClick={this.changepasswordtype}>
                                  Facebook Auth
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </AvGroup>
                        </Colxx>

                        {/* <Colxx sm={12}>
                          <AvGroup className="modal_select_form_group ">
                            <Label className="av-label modal_select_form_label" for="add_website">
                              Website
                            </Label>
                            <Dropdown
                                isOpen={this.state.iswebsite}
                                toggle={this.togglewebsite}
                                
                                className="mb-5"
                                id="add_website"
                              >
                              <DropdownToggle caret color="secondary" outline>
                                {this.state.website}
                              </DropdownToggle>
                              <DropdownMenu>
                                <DropdownItem value="Tripadvisor" onClick={this.changewebsite}>
                                  Tripadvisor
                                </DropdownItem>
                                <DropdownItem value="Yelp" onClick={this.changewebsite}>
                                  Yelp
                                </DropdownItem>
                                <DropdownItem value="eBay" onClick={this.changewebsite}>
                                  eBay
                                </DropdownItem>
                              </DropdownMenu>
                            </Dropdown>
                          </AvGroup>
                        </Colxx> */}
                        { (this.state.passwordtype != 'Google Auth' && this.state.passwordtype != 'Facebook Auth') ?
                          <div><Colxx sm={12}>
                            <AvGroup>
                              <Label className="av-label" for="add_username">
                                Username
                              </Label>
                              <AvInput className="form-control" name="rank" id="add_username" onChange={this.changeusername} value={this.state.username} required />
                              <AvFeedback>
                                Username is required.
                              </AvFeedback>
                            </AvGroup>
                          </Colxx>

                          <Colxx sm={12}>
                            <AvGroup>
                              <Label className="av-label" for="add_password">
                                Password
                              </Label>
                              
                              <AvInput name="testit" type="password" id="add_password" onChange={this.changepassword} value={this.state.password} required />
                              <AvFeedback>
                                Password is required.
                              </AvFeedback>
                            </AvGroup>
                          </Colxx>

                          <Colxx sm={12}>
                            <AvGroup>
                              <Label className="av-label" for="add_location">
                                Location
                              </Label>
                              <AvInput name="rank" id="add_location" onChange={this.changelocation} value={this.state.location} required />
                              <AvFeedback>
                                Location is required.
                              </AvFeedback>
                            </AvGroup>
                          </Colxx></div> : <Colxx sm={12}></Colxx>
                        }
                        <Colxx sm={12}>
                          <FormGroup>
                            <Button color="primary" id="forms.submit" onClick={this.submitUser}>
                              {(this.state.passwordtype == 'Google Auth' || this.state.passwordtype == 'Facebook Auth' ) ? 'Add your ' + this.state.passwordtype.split(' ')[0] + ' business page': (this.state.modaltype == 'add' ? 'Add': 'Update')}
                            </Button>{" "}
                            <Button color="secondary" onClick={this.edittoggle}>
                              Cancel
                            </Button>
                          </FormGroup>
                        </Colxx>
                      
                      
                    </ModalBody>
                    </AvForm>
                    
                  </Modal>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        <ToastsContainer store={ToastsStore}/>

      </Fragment>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, userList, loading, pin } = authUser;
  return { user, userList, loading, pin };
};

export default connect(
  mapStateToProps,
  {
    registerUser,
    getUserlist,
    updateUser,
    deleteUser,
    createPin,
    updatePin,
    getPin,
    resetPin
  }
)(SettingsLayout);
