import React, { Component, Fragment } from "react";
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
  }
];
const dataTableColumns = [
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
    Cell: Props => 
    <div>
      <Button color='' className="action-button"><i className='simple-icon-pencil'></i></Button>
      <Button color='' className="action-button"><i className='simple-icon-trash'></i></Button>
    </div>
  }
];
export default class extends Component {
   constructor(props) {
    super(props);
    this.state = {
      editmodal: false,
      ispasswordtype: false,
      iswebsite: false,
      passwordtype: 'Generic',
      website: 'Tripadvisor'
    };

    this.edittoggle = this.edittoggle.bind(this);
    this.togglepasswordtype = this.togglepasswordtype.bind(this);
    this.togglewebsite = this.togglewebsite.bind(this);

    this.changepasswordtype = this.changepasswordtype.bind(this);
    this.changewebsite = this.changewebsite.bind(this);

  }
  edittoggle() {
    this.setState({
      editmodal: !this.state.editmodal
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
  changepasswordtype(event) {
    let currentpasswordtype = event.target.value;
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
                  data={dataTableData}
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
                <Modal isOpen={this.state.editmodal} toggle={this.edittoggle}>
                    <ModalHeader toggle={this.edittoggle}>
                      Add Password
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
                            <AvInput className="form-control" name="rank" id="add_username" required />
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
                            
                            <AvInput name="testit" type="password" id="add_password" required />
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
                            <AvInput name="rank" id="add_location" required />
                            <AvFeedback>
                              Location is required.
                            </AvFeedback>
                          </AvGroup>
                        </Colxx>

                        <Colxx sm={12}>
                          <FormGroup>
                            <Button color="primary" id="forms.submit">
                              Do Something
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
