import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import IntlMessages from "Util/IntlMessages";
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
import { 
  registerUser,
  getUserlist,
  updateUser,
  deleteUser
} from "Redux/actions";

const dataTableData = [
  {
    "location": "Sydney",
    "username": "jason.123@gmail.com",
    "password": "123",
    "website": "Tripadvisor"
  },
  {
    "location": "Perth",
    "username": "blueshark0811@gmail.com",
    "password": "123",
    "website": "Yelp"
  },
  {
    "location": "Sydney",
    "username": "jason.123@gmail.com",
    "password": "123",
    "website": "Quandoo"
  },
];
let  dataTableColumns;
class SettingsLayout extends Component {
   constructor(props) {
    super(props);
    this.state = {
      deletemodal: false,
      editmodal: false,
      ispasswordtype: false,
      iswebsite: false,
      passwordtype: 'Generic',
      website: 'Tripadvisor',
      username: '',
      password: '',
      location: '',
      _id: '',
      data: [],
      loading: true,
      modaltype: ''
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
    this.props.getUserlist();

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
          Header: "Website",
          accessor: "website",
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
    if(this.state.location != '' && this.state.password != '' && this.state.username != ''){
      if(this.state.modaltype == 'add')
        this.props.registerUser(this.state, this.props.history);
      else
        this.props.updateUser(this.state);
      
      this.setState({
        editmodal: !this.state.editmodal
      });
    }
  }
      
  edittoggle() {
    this.setState({
      editmodal: !this.state.editmodal,
      modaltype: 'add',
      passwordtype: 'Generic',
      website: 'Tripadvisor',
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
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.userList);
    this.setState(prevState => ({
      data: nextProps.userList,
      loading: false
    }));
  }
  render() {
    return (
      <Fragment>
        <Row>
          <Colxx xxs="12">
              <h1>Password Management</h1>
              <Button color="primary" className="mb-2 create-pin">
                  Create Pin
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

                        <Colxx sm={12}>
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
                        </Colxx>
                        <Colxx sm={12}>
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
                            </Label>w
                            
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
                        </Colxx>

                        <Colxx sm={12}>
                          <FormGroup>
                            <Button color="primary" id="forms.submit" onClick={this.submitUser}>
                              {this.state.modaltype == 'add' ? 'Add': 'Update'}
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
      </Fragment>
    );
  }
}
const mapStateToProps = ({ authUser }) => {
  const { user, userList, loading } = authUser;
  return { user, userList, loading };
};

export default connect(
  mapStateToProps,
  {
    registerUser,
    getUserlist,
    updateUser,
    deleteUser
  }
)(SettingsLayout);
