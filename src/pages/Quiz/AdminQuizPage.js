import { Container } from "@material-ui/core";
import { Avatar, Paper, Typography } from "@material-ui/core";
import { Col, Row } from "react-bootstrap";
import { Suspense } from "react";
import { useParams } from "react-router";
import { BASE_URL } from "../../utils/apiEndpoints";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Card,
  IconButton,
  TableFooter,
  TablePagination,
  CircularProgress,
  Button,
} from "@material-ui/core";
import TablePaginationActions from "@material-ui/core/TablePagination/TablePaginationActions";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import ControlPointIcon from "@material-ui/icons/ControlPoint";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { useState, useEffect } from "react";
import axios from "axios";
import Toast_Comp from "../../components/Toast/Toast_Comp";
import { Modal, Form } from "react-bootstrap";
import Spinner_comp from "../../components/Spinner/Spinner_comp";
import { formatDate } from "../../utils/helpers";

const useStyles = makeStyles({
  table: {
    minWidth: 300,
  },
  root: {
    height: "100%",
    paddingTop: "30px",
  },
});

const AdminQuizPage = () => {
  const { id } = useParams();
  const classes = useStyles();
  const [toast, setToast] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [question, setQuestion] = useState("");
  const [correct_answer, setCorrectAnsw] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [answer4, setAnswer4] = useState("");
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [diff, setDiff] = useState(false);
  const [mess, setMess] = useState("");
  const [type, setType] = useState("success");
  const [listQuestion, setListQuestion] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [idEdit, setIdEdit] = useState("");
  const [chart, setChart] = useState(false);
  const [listExam, setListExam] = useState([]);
  const handleClose = () => setLgShow(false);
  const handleCloseChart = () => setChart(false);
  const handleShow = () => {
    setLgShow(true);
  };

  const handleShowChart = () => setChart(true);

  const addQuestion = () => {
    setLgShow(true);
    setCategory("");
    setDiff(false);
    setQuestion("");
    setAnswer1("");
    setAnswer2("");
    setAnswer3("");
    setAnswer4("");
    setCorrectAnsw("");
    setToast(false);
    setIsEdit(false);
    setLoading(false);
  };

  useEffect(async () => {
    try {
      const data = await axios.get(`${BASE_URL}/get-leader`);
      if (data.status === 200) {
        setListExam(data.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(async () => {
    try {
      const res = await axios.get(`${BASE_URL}/get-quiz/${id}`);
      if (res.status === 200) {
        setListQuestion(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [toast]);

  const courseFormHandler = async (e) => {
    e.preventDefault();
    let correctAnsArr = [];
    correctAnsArr.splice(0, 0, answer1, answer2, answer3, answer4);
    if (correctAnsArr.includes(correct_answer)) {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/post-quiz`, {
        category: category,
        typeCourse: id,
        isStart: false,
        difficulty: diff,
        question: question,
        correct_answer: correct_answer,
        answers: correctAnsArr,
      });
      if (res.status === 200) {
        setMess("T???o c??u h???i th??nh c??ng");
        setType("success");
        setToast(true);
        setLgShow(false);
        setLoading(false);
        setCategory("");
        setDiff(false);
        setQuestion("");
        setAnswer1("");
        setAnswer2("");
        setAnswer3("");
        setAnswer4("");
        setCorrectAnsw("");
      }
    } else {
      setToast(true);
      setMess("????p ??n kh??ng tr??ng kh???p");
      setType("error");
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      const res = await axios.delete(`${BASE_URL}/delete-quiz/${id}`);
      if (res.status === 200) {
        setMess("Xo?? c??u h???i th??nh c??ng");
        setType("success");
        setToast(true);
      } else {
        setMess("Xo?? c??u h???i th???t b???i");
        setType("error");
        setToast(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditItem = async (id) => {
    setLgShow(true);
    setIsEdit(true);
    const res = await axios.get(`${BASE_URL}/find-by-id-quiz/${id}`);
    if (res.status === 200) {
      const item = res.data.data;
      setIdEdit(item._id);
      setCategory(item.category);
      setDiff(item.difficulty);
      setQuestion(item.question);
      setAnswer1(item.answers[0]);
      setAnswer2(item.answers[1]);
      setAnswer3(item.answers[2]);
      setAnswer4(item.answers[3]);
      setCorrectAnsw(item.correct_answer);
    }
  };

  const editForm = async (e) => {
    e.preventDefault();
    let correctAnsArr = [];
    correctAnsArr.splice(0, 0, answer1, answer2, answer3, answer4);
    if (correctAnsArr.includes(correct_answer)) {
      setLoading(true);
      const res = await axios.put(`${BASE_URL}/update-quiz`, {
        idEdit: idEdit,
        category: category,
        typeCourse: id,
        isStart: false,
        difficulty: diff,
        question: question,
        correct_answer: correct_answer,
        answers: correctAnsArr,
      });
      if (res.status === 200) {
        setMess("C???p nh???t c??u h???i th??nh c??ng");
        setType("success");
        setToast(true);
        setLgShow(false);
        setLoading(false);
        setCategory("");
        setDiff(false);
        setQuestion("");
        setAnswer1("");
        setAnswer2("");
        setAnswer3("");
        setAnswer4("");
        setCorrectAnsw("");
      }
    } else {
      setToast(true);
      setMess("????p ??n kh??ng tr??ng kh???p");
      setType("error");
    }
  };

  const calculateNumber = (score, total) => {
    const scores = (100 / total) * score;
    return `${scores} ??i???m`;
  };

  return (
    <div>
      <Container>
        <Toast_Comp
          setToast={setToast}
          renderToast={toast}
          msg={mess}
          type={type}
        />
        <Suspense fallback={<div>Loading...</div>}>
          <Container fluid className="mb-5 mt-5">
            <Row>
              <Col md={12}>
                <Button
                  variant="outlined"
                  startIcon={<ControlPointIcon />}
                  onClick={addQuestion}
                  className="mr-2"
                >
                  Th??m c??u h???i
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<ControlPointIcon />}
                  onClick={handleShowChart}
                >
                  B???ng x???p h???ng
                </Button>
                <Paper className="p-5 m-3 shadow">
                  <Typography
                    className="text-center font-weight-bold pb-4"
                    variant="h5"
                  >
                    Danh s??ch c??u h???i
                  </Typography>
                  <Container className={classes.root}>
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        aria-label="simple table"
                      >
                        <TableHead>
                          <TableRow className="bg-dark ">
                            <TableCell align="center" className="text-light">
                              C??u h???i
                            </TableCell>
                            <TableCell align="center" className="text-light">
                              Ch??? ?????
                            </TableCell>
                            <TableCell align="center" className="text-light">
                              ????? kh??
                            </TableCell>
                            <TableCell align="center" className="text-light">
                              ????p ??n ????ng
                            </TableCell>
                            <TableCell align="center" className="text-light">
                              H??nh ?????ng
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {listQuestion.map((row) => (
                            <TableRow key={row.id}>
                              <TableCell align="center">
                                {row.question}
                              </TableCell>
                              <TableCell align="center">
                                {row.category}
                              </TableCell>
                              <TableCell align="center">
                                {row.difficulty ? (
                                  <span className="alert alert-danger">
                                    Kh??
                                  </span>
                                ) : (
                                  ""
                                )}
                              </TableCell>
                              <TableCell align="center">
                                <span className="alert alert-success">
                                  {row.correct_answer}
                                </span>
                              </TableCell>
                              <TableCell align="center">
                                <Button
                                  variant="outlined"
                                  style={{
                                    fontSize: "10px",
                                    marginRight: "10px",
                                  }}
                                  onClick={() => handleEditItem(row._id)}
                                >
                                  Edit
                                </Button>
                                <Button
                                  variant="contained"
                                  style={{ fontSize: "10px" }}
                                  onClick={() => handleDeleteItem(row._id)}
                                >
                                  Delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Container>
                </Paper>
              </Col>
            </Row>
          </Container>
        </Suspense>
      </Container>
      {/* modal */}
      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Typography color="textSecondary" variant="h4">
              {isEdit ? "Ch???nh s???a c??u h???i" : "Th??m C??u h???i"}
            </Typography>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading && <Spinner_comp />}
          <Form
            onSubmit={isEdit ? editForm : courseFormHandler}
            encType="multipart/form-data"
          >
            <Form.Group>
              <Form.Label>Th??? lo???i c??u h???i</Form.Label>
              <Form.Control
                required
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
                value={category}
                type="text"
                placeholder="C??u h???i"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>????? Kh??</Form.Label>
              <Form.Check
                checked={diff}
                onChange={(e) => {
                  setDiff(true);
                }}
                type="checkbox"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nh???p c??u h???i</Form.Label>
              <Form.Control
                required
                onChange={(e) => {
                  setQuestion(e.target.value);
                }}
                value={question}
                type="text"
                placeholder="C??u h???i"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>????p ??n 1</Form.Label>

              <Form.Control
                required
                onChange={(e) => {
                  setAnswer1(e.target.value);
                }}
                value={answer1}
                type="text"
                placeholder="????p ??n 1"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>????p ??n 2</Form.Label>

              <Form.Control
                required
                onChange={(e) => {
                  setAnswer2(e.target.value);
                }}
                value={answer2}
                type="text"
                placeholder="????p ??n 2"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>????p ??n 3</Form.Label>

              <Form.Control
                required
                onChange={(e) => {
                  setAnswer3(e.target.value);
                }}
                value={answer3}
                type="text"
                placeholder="????p ??n 3"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>????p ??n 4</Form.Label>

              <Form.Control
                required
                onChange={(e) => {
                  setAnswer4(e.target.value);
                }}
                value={answer4}
                type="text"
                placeholder="????p ??n 4"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>????p ??n ????ng</Form.Label>

              <Form.Control
                required
                onChange={(e) => {
                  setCorrectAnsw(e.target.value);
                }}
                value={correct_answer}
                type="text"
                placeholder="????p ??n ????ng"
              />
            </Form.Group>
            <Button type="submit" color="primary" variant="contained">
              X??c nh???n
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button color="secondary" variant="contained" onClick={handleClose}>
            ????ng
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        size="lg"
        show={chart}
        onHide={() => setChart(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        onHide={handleCloseChart}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <Typography color="textSecondary" variant="h4">
              B???ng X???p H???ng
            </Typography>
            <Typography
              color="textSecondary"
              style={{
                fontSize: "14px",
              }}
            >
              {formatDate(listExam[0]?.createdAt)}
            </Typography>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow className="bg-dark ">
                  <TableCell align="center" className="text-light">
                    T??n Ng?????i D??ng
                  </TableCell>
                  <TableCell align="center" className="text-light">
                    S??? C??u Tr??? L???i ????ng
                  </TableCell>
                  <TableCell align="center" className="text-light">
                    T???ng S??? C??u H???i
                  </TableCell>
                  <TableCell align="center" className="text-light">
                    ??i???m S???
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {listExam.map((item, index) => (
                  <TableRow key={item._id}>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">{item.score}</TableCell>
                    <TableCell align="center">{listQuestion?.length}</TableCell>
                    <TableCell align="center">
                      {calculateNumber(item.score, listQuestion?.length)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="secondary"
            variant="contained"
            onClick={handleCloseChart}
          >
            ????ng
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminQuizPage;
