import React from "react";
import styled from "styled-components";
import CreateFormQuestionTypeCard from "./CreateFormQuestionTypeCard";
import { useDispatch, useSelector } from "react-redux";
import { selectedFormType } from "../../../../redux/modules/createFormSlice";

const CreateFormSidebar = () => {
  const dispatch = useDispatch();
  const questionType = useSelector(
    (state) => state.createForm.selectedFormType
  );

  const selectTypeHandler = (type) => {
    questionType === "Cover"
      ? alert("문항을 추가해주세요")
      : dispatch(selectedFormType(type));
  };

  return (
    <Container>
      <CardContainer>
        <Card>
          <CreateFormQuestionTypeCard
            questionType="점수 페이지"
            onClick={() => {
              selectTypeHandler("Score");
            }}
          />
          <p>점수 페이지</p>
        </Card>
        <Card>
          <CreateFormQuestionTypeCard
            questionType="만족도 페이지"
            onClick={() => {
              selectTypeHandler("Slide");
            }}
          />
          <p>만족도 페이지</p>
        </Card>
        <Card>
          <CreateFormQuestionTypeCard
            questionType="객관식 페이지"
            onClick={() => {
              selectTypeHandler("SingleChoice");
            }}
          />
          <p>객관식 페이지</p>
        </Card>
        <Card>
          <CreateFormQuestionTypeCard
            questionType="순위 페이지"
            onClick={() => {
              selectTypeHandler("Rank");
            }}
          />
          <p>순위 페이지</p>
        </Card>
        <Card>
          <CreateFormQuestionTypeCard
            questionType="주관식 페이지"
            onClick={() => {
              selectTypeHandler("ShortDescriptive");
            }}
          />
          <p>주관식 페이지</p>
        </Card>
      </CardContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 25rem;
  height: 100%;

  border: 1px solid #d9d9d9;
  border-radius: 0px 5px 5px 0px;
  background: ${({ theme }) => theme.sideColor2};

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CardContainer = styled.div`
  height: 90%;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  p {
    margin-top: 1.5rem;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default CreateFormSidebar;
