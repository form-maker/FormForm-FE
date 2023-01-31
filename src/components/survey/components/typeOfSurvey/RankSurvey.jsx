import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import {
  changeAnswerList,
  __getSurveyQuestion,
} from "../../../../redux/modules/surveySlice";
import fonts from "../../../../styles/fonts";
import Title from "../Title";
import TurnAPageButtons from "../../components/TurnAPageButtons";
import RoundButtonMedium from "../../../common/buttons/roundButtons/RoundButtonMedium";

const RankSurvey = () => {
  const dispatch = useDispatch();
  const question = useSelector((state) => state.survey.question);
  let addAnswerId = question.answerList?.map((answer, index) => {
    return {
      id: String(index + 1),
      answer: answer.answerValue,
      answerNum: answer.answerNum,
    };
  });
  const currentPageNum = useSelector((state) => state.survey.currentPageNum);
  const questionIdList = useSelector((state) => state.survey.questionIdList);
  const [characters, updateCharacters] = useState(addAnswerId);

  let answerNumList = [];
  for (let i = 1; i <= question.answerList?.length; i++) {
    answerNumList.push(i);
  }

  const goNextPageHandler = () => {
    currentPageNum !== questionIdList.length + 1 &&
      setTimeout(() => {
        dispatch(__getSurveyQuestion(questionIdList[currentPageNum - 1]));
      }, 400);
  };

  useEffect(() => {
    let answerList = characters?.map((character) => {
      return character.answerNum;
    });
    dispatch(changeAnswerList(answerList));
  }, [dispatch, characters]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateCharacters(items);
  }

  return (
    <Container>
      <Title />
      <Main>
        <CommentContainer>
          <p>드래그 앤 드롭으로 원하는 순위를 조정해주세요</p>
        </CommentContainer>
        <DragDropContainer>
          <AnswerNumberContainer>
            {answerNumList.map((answerNum) => (
              <div>{answerNum}</div>
            ))}
          </AnswerNumberContainer>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <DNDListContainer
                  className="characters"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {characters?.map(({ id, answer }, index) => {
                    return (
                      <Draggable key={id} draggableId={id} index={index}>
                        {(provided) => (
                          <DNDList
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            {`${answer}`}
                          </DNDList>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </DNDListContainer>
              )}
            </Droppable>
          </DragDropContext>
        </DragDropContainer>
      </Main>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 26.5rem;
  height: 100%;
  padding-top: 6.1rem;
  @media screen and (min-width: 500px) {
    justify-content: center;
    width: 40rem;
  }
`;

const Main = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CommentContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  p {
    ${fonts.Body3}
    font-weight: 400;
    font-size: 1.2rem;
  }
  @media screen and (min-width: 500px) {
    p {
      margin-top: 0;
      font-size: 1.2rem;
    }
  }
`;

const DragDropContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  @media screen and (min-width: 500px) {
    justify-content: center;
  }
`;

const AnswerNumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem 0 1rem 0;
  div {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0.4rem 1rem;
    padding: 1rem 1rem;
    width: 3rem;
    height: 3rem;

    ${fonts.Body1}
    font-weight: 500;
    font-size: 1.2rem;

    background-color: ${({ theme }) => theme.subColor2};
    border-radius: 10px;
  }
`;

const DNDListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
`;

const DNDList = styled.div`
  display: flex;
  align-items: center;

  margin: 0.4rem 0;
  padding: 0.8rem;
  width: 21rem;

  ${fonts.Body1}
  font-weight: 500;
  font-size: 1.2rem;

  background-color: ${({ theme }) => theme.subColor1};
  border-radius: 10px;
  p {
    margin: 0;
  }

  @media screen and (min-width: 500px) {
    font-size: 1.2rem;
    width: 37rem;
  }
`;

export default RankSurvey;
