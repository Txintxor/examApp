import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./App.css";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function App() {
  //Este estado guarda el numero de la pregunta y la respuesta
  const [answers, setAnswers] = useState([
    {
      question: 0,
      answer: "",
    },
  ]);
//Estado que guarda las respuestas correctas
  const [solutions, setSolutions] = useState([
    {
      question: 0,
      answer: "",
    },
  ]);

//Estado que abre o cierra el modal
  const [showModal, setShowModal] = useState(false);

//Funciones que manejan el modal
  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () =>{
     setShowModal(false)
     setSolutions([]);
    };

  //Esta función se encarga de guardar los datos del estado answers, se encarga de comprobar si existe respuesta ya creada
  //y o crea una nueva o hace updated de una ya respondida
  const handleAnswers = (num, option) => {
    const existingAnswerIndex = answers.findIndex(
      (answer) => answer.question === num
    );

    //Si no lo encuentra, findIndex devuelve -1, así que se crea la respuesta
    if (existingAnswerIndex === -1) {
      setAnswers((prevAnswers) => [
        ...prevAnswers,
        { question: num, answer: option },
      ]);
    } else {
      setAnswers((prevAnswers) => {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = {
          question: num,
          answer: option,
        };
        return updatedAnswers;
      });
    }
  };

  //Funcion que maneja las respuestas en el modal
  const handleSolutions = (questionNum, option) => {
    if (answers.some((answer) => answer.question === questionNum && answer.answer === option)) {
      // Opción premarcada, no hacer nada
      return;
    }
  
    setSolutions((prevSolutions) => ({
      ...prevSolutions,
      [questionNum]: option,
    }));
  };

  //Este componente pintará una columna de respuestas del test
  const QuestionColumn = ({ startNum }) => {
    //Este array guarda los rows generados para una columna de respuestas
    const questionsListArray = [];
    //Con esta constante indicamos cuantos row queremos por colummna
    const columnSize = 10;

    for (let num = startNum; num < startNum + columnSize; num++) {
      questionsListArray.push(
        <>
          <Row key={num}>
            <Col
              md={1}
              style={{ minWidth: "2.5rem", padding: ".5rem 0 0 1rem" }}
              className="  border border-1 "
            >
              <p>{num}</p>
            </Col>
            <Col
              md={2}
              className=" justify-content-center align-content-center border border-1 "
            >
              <input
                onChange={() => handleAnswers(num, "a")}
                type="radio"
                id={`optionA${num}`}
                name={`question${num}`}
                checked={solutions[num] === "a" || answers.some(
                  (answer) => answer.question === num && answer.answer === "a"
                )}
              />
              <label htmlFor={`optionB${num}`} style={{ padding: "3px" }}>
                A
              </label>
            </Col>
            <Col
              md={2}
              className=" justify-content-center align-content-center border border-1 "
            >
              <input
                onChange={() => handleAnswers(num, "b")}
                type="radio"
                id={`optionB${num}`}
                name={`question${num}`}
                checked={solutions[num] === "b" || answers.some(
                  (answer) => answer.question === num && answer.answer === "b"
                )}
              />
              <label htmlFor={`optionB${num}`} style={{ padding: "3px" }}>
                B
              </label>
            </Col>
            <Col
              md={2}
              className=" justify-content-center align-content-center border border-1 "
            >
              <input
                onChange={() => handleAnswers(num, "c")}
                type="radio"
                id={`optionC${num}`}
                name={`question${num}`}
                checked={solutions[num] === "c" || answers.some(
                  (answer) => answer.question === num && answer.answer === "c"
                )}
              />
              <label htmlFor={`optionB${num}`} style={{ padding: "3px" }}>
                C
              </label>
            </Col>
            <Col
              md={2}
              className=" justify-content-center align-content-center border border-1 "
            >
              <input
                onChange={() => handleAnswers(num, "d")}
                type="radio"
                id={`optionD${num}`}
                name={`question${num}`}
                checked={solutions[num] === "d" || answers.some(
                  (answer) => answer.question === num && answer.answer === "d"
                )}
              />
              <label htmlFor={`optionB${num}`} style={{ padding: "3px" }}>
                D
              </label>
            </Col>
          </Row>
        </>
      );
    }
    return questionsListArray;
  };



//Complemento que rellena el Modal

const CorrectionColumn = ({startNum})=> {
  //Este array guarda los rows generados para una columna de respuestas
  const questionsListArray = [];
  //Con esta constante indicamos cuantos row queremos por colummna
  const columnSize = 10;
 //Generamos un loop que irá pintando las columnas
  for (let num = startNum; num < startNum + columnSize; num++) {
    questionsListArray.push(
      <>
        <Row key={num}>
          <Col
            md={1}
            style={{ minWidth: "2.5rem", padding: ".5rem 0 0 1rem" }}
            className="  border border-1 "
          >
            <p>{num}</p>
          </Col>
          <Col
            md={2}
            className=" justify-content-center align-content-center border border-1 "
          >
            <input
              onChange={() => handleSolutions(num, "a")}
              type="checkbox"
              id={`optionA${num}`}
              name={`question${num}`}
              checked={solutions[num] === "a" || answers.some(
                (answer) => answer.question === num && answer.answer === "a"
              )}
              disabled={answers.some(
                (answer) => answer.question === num && answer.answer === "a"
              )}
            />
            <label htmlFor={`optionB${num}`} style={{ padding: "3px" }}>
              A
            </label>
          </Col>
          <Col
            md={2}
            className=" justify-content-center align-content-center border border-1 "
          >
            <input
              onChange={() => handleSolutions(num, "b")}
              type="checkbox"
              id={`optionB${num}`}
              name={`question${num}`}
              checked={solutions[num] === "b" || answers.some(
                (answer) => answer.question === num && answer.answer === "b"
              )}
              disabled={answers.some(
                (answer) => answer.question === num && answer.answer === "b"
              )}
            />
            <label htmlFor={`optionB${num}`} style={{ padding: "3px" }}>
              B
            </label>
          </Col>
          <Col
            md={2}
            className=" justify-content-center align-content-center border border-1 "
          >
            <input
              onChange={() => handleSolutions(num, "c")}
              type="checkbox"
              id={`optionC${num}`}
              name={`question${num}`}
              checked={solutions[num] === "c" || answers.some(
                (answer) => answer.question === num && answer.answer === "c"
              )}
              disabled={answers.some(
                (answer) => answer.question === num && answer.answer === "c"
              )}
            />
            <label htmlFor={`optionB${num}`} style={{ padding: "3px" }}>
              C
            </label>
          </Col>
          <Col
            md={2}
            className=" justify-content-center align-content-center border border-1 "
          >
            <input
              onChange={() => handleSolutions(num, "d")}
              type="checkbox"
              id={`optionD${num}`}
              name={`question${num}`}
              checked={solutions[num] === "d" || answers.some(
                (answer) => answer.question === num && answer.answer === "d"
              )}
              disabled={answers.some(
                (answer) => answer.question === num && answer.answer === "d"
              )}
            />
            <label htmlFor={`optionB${num}`} style={{ padding: "3px" }}>
              D
            </label>
          </Col>
        </Row>
      </>
    );
  }
  return questionsListArray;
}

  return (
    <div className="App">
      <Container fluid className="m-5">
        <Row>
          <Col md={3}>
            <QuestionColumn startNum={1} />
          </Col>
          <Col md={3}>
            <QuestionColumn startNum={11} />
          </Col>
          <Col md={3}>
            <QuestionColumn startNum={21} />
          </Col>
          <Col md={3}>
            <QuestionColumn startNum={31} />
          </Col>
        </Row>
        <Button size="lg" className="mt-5 mx-5" onClick={()=>handleShowModal() }>Corrige</Button>
        <Button size="lg" className="mt-5" onClick={()=>setAnswers([]) }>Reset</Button>
      </Container>

      {/***************MODAL**************/}

      <Modal  show={showModal} onHide={handleHideModal} size="fullscreen" centered>
    <Modal.Header closeButton>
      <Modal.Title>Corrección</Modal.Title>
    </Modal.Header>
    <Modal.Body>
    <Row>
          <Col md={3}>
            <CorrectionColumn startNum={1} />
          </Col>
          <Col md={3}>
            <CorrectionColumn startNum={11} />
          </Col>
          <Col md={3}>
            <CorrectionColumn startNum={21} />
          </Col>
          <Col md={3}>
            <CorrectionColumn startNum={31} />
          </Col>
        </Row>
    </Modal.Body>
      </Modal>
    </div>
  );
}

export default App;
