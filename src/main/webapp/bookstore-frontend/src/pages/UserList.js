import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../services/index";

// import "./../../assets/css/Style.css";
import {
  Card,
  Table,
  InputGroup,
  FormControl,
  Button,
  Alert,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faStepBackward,
  faFastBackward,
  faStepForward,
  faFastForward,
} from "@fortawesome/free-solid-svg-icons";

// class UserList extends Component {

//   constructor(props) {
//     super(props);
//     this.state = {
//       users: [],
//       currentPage: 1,
//       usersPerPage: 5,
//     };
//   }

//   componentDidMount() {
//     this.props.fetchUsers();
//   }



const UserList = ({userData,fetchUsers}) =>{

        // const { currentPage, usersPerPage } = this.state;
    // const [currentPage, setCurrentPage] = useState(1);
    // const [usersPerPage, setUsersPerPage] = useState(5);
    // const [users,setUsers] = useState([]);

    // const lastIndex = currentPage * usersPerPage;
    // const firstIndex = lastIndex - usersPerPage;

    var users = userData.users;
    // const currentUsers = users && users.slice(firstIndex, lastIndex);
    // const totalPages = users && users.length / usersPerPage;


//    const changePage = (event) => {
//         // this.setState({
//         //   [event.target.name]: parseInt(event.target.value),
//         // });
//         setCurrentPage(parseInt(event.target.value));
//       };
    
//     const  firstPage = () => {
//         if (currentPage > 1) {
//           setCurrentPage(1);
//         }
//       };
    
//     const  prevPage = () => {
//         if (currentPage > 1) {
//           setCurrentPage(currentPage-1);
//         }
//       };
    
//     const  lastPage = () => {
//         let usersLength = users.length;
//         if (
//           currentPage < Math.ceil(usersLength / usersPerPage)
//         ) {
//           setCurrentPage(Math.ceil(usersLength / usersPerPage));
//         }
//       };
    
//     const  nextPage = () => {
//         if (
//           currentPage < Math.ceil(users.length / usersPerPage)
//         ) {
//           setCurrentPage(currentPage+1);
//         }
//       };

    useEffect(() => {
        fetchUsers();
        // setUsers()
        return () => {
            console.log("cleanUp");
        }
    }, [])
    return (
      <div>
        {userData.error ? (
          <Alert variant="danger">{userData.error}</Alert>
        ) : (
          <Card className={"border border-dark bg-dark text-white"}>
            <Card.Header>
              <FontAwesomeIcon icon={faUsers} /> User List
            </Card.Header>
            <Card.Body>
              <Table bordered hover striped variant="dark" >
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Address</td>
                    <td>Created</td>
                    <td>Balance</td>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr align="center">
                      <td colSpan="6">No Users Available</td>
                    </tr>
                  ) : (
                    users.slice(0,10).map((user, index) => (
                      <tr key={index}>
                        <td>
                          {user.first} {user.last}
                        </td>
                        <td>{user.email}</td>
                        <td>{user.address}</td>
                        <td>{user.created}</td>
                        <td>{user.balance}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </Card.Body>
            {/* {users.length > 0 ? (
              <Card.Footer>
                <div style={{ float: "left" }}>
                  Showing Page {currentPage} of {totalPages}
                </div>
                <div style={{ float: "right" }}>
                  <InputGroup size="sm">
                    <InputGroup.Prepend>
                      <Button
                        type="button"
                        variant="outline-info"
                        disabled={currentPage === 1 ? true : false}
                        onClick={firstPage()}
                      >
                        <FontAwesomeIcon icon={faFastBackward} /> First
                      </Button>
                      <Button
                        type="button"
                        variant="outline-info"
                        disabled={currentPage === 1 ? true : false}
                        onClick={prevPage()}
                      >
                        <FontAwesomeIcon icon={faStepBackward} /> Prev
                      </Button>
                    </InputGroup.Prepend>
                    <FormControl
                      className={"page-num bg-dark"}
                      name="currentPage"
                      value={currentPage}
                      onChange={changePage()}
                    />
                    <InputGroup.Append>
                      <Button
                        type="button"
                        variant="outline-info"
                        disabled={currentPage === totalPages ? true : false}
                        onClick={nextPage()}
                      >
                        <FontAwesomeIcon icon={faStepForward} /> Next
                      </Button>
                      <Button
                        type="button"
                        variant="outline-info"
                        disabled={currentPage === totalPages ? true : false}
                        onClick={lastPage()}
                      >
                        <FontAwesomeIcon icon={faFastForward} /> Last
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </div>
              </Card.Footer>
            ) : null}  */}
          </Card>
        )}
      </div>
    );
}

const mapStateToProps = (state) => {
  return {
    userData: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
