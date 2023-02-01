import React, { useEffect } from "react";
import { batch } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  fillOutQuestion,
  fillOutQuestionTitleAndSummery,
  selectedFormType,
} from "../../../../../redux/modules/createFormSlice";
import fonts from "../../../../../styles/fonts";

const Consent = () => {
  const dispatch = useDispatch();
  const currentPageNum = useSelector(
    (state) => state.createForm.currentPageNum
  );
  const questionTitle = useSelector(
    (state) =>
      state.createForm.formList?.questionList[currentPageNum - 2][
        "questionTitle"
      ]
  );

  const questionSummary = useSelector(
    (state) =>
      state.createForm.formList?.questionList.length !== 0 &&
      state.createForm.formList?.questionList[currentPageNum - 2][
        "questionSummary"
      ]
  );

  useEffect(() => {
    currentPageNum > 1 &&
      !questionTitle &&
      dispatch(
        fillOutQuestion({
          questionType: "CONSENT",
          questionTitle: "정보 이용 동의서",
          questionSummary: "",
          answerList: [],
        })
      );
  }, []);

  const InputHandler = (event) => {
    const { name, value } = event.target;
    dispatch(
      fillOutQuestionTitleAndSummery({
        key: name,
        value,
      })
    );
  };

  return (
    <Container>
      <TitleContainer>
        <div>{questionTitle}</div>
        <SubTitleInput
          placeholder="정보 동의에 필요한 추가 사항을 작성해주세요(선택사항)"
          value={questionSummary || ""}
          name="questionSummary"
          onChange={InputHandler}
          maxLength={500}
        ></SubTitleInput>
        <p>500자 이내로 작성해주세요 ({questionSummary?.length}자)</p>
      </TitleContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 26.5rem;
  height: 100%;
  padding-top: 6.1rem;
  @media screen and (min-width: 500px) {
    justify-content: center;
    width: 40rem;
    padding-top: 3rem;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  padding-top: 6.5rem;
  width: 100%;
  div {
    &:nth-child(1) {
      text-align: center;
      width: 50rem;

      ${fonts.Body1}
      font-weight: 700;
      font-size: 2rem;
    }
  }
  p {
    margin: 0.3rem 0 0 0;

    font-weight: 700;
    font-size: 1.2rem;
    text-align: center;

    color: ${({ theme }) => theme.pointColor};
  }
`;

const SubTitleInput = styled.textarea`
  box-sizing: border-box;

  width: 50rem;
  height: 20rem;
  padding: 1rem;
  margin-top: 3rem;

  ${fonts.Body1}
  font-weight: 600;
  font-size: 1.4rem;

  background-color: transparent;
  border: ${({ theme }) => `2px solid ${theme.subColor1}`};
  border-radius: 1rem;

  scroll-behavior: auto;
  resize: none;
  &::placeholder {
    color: ${({ theme }) => theme.gray4};
    text-align: center;
  }
`;

const Main = styled.div`
  flex: 1;
  position: relative;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default Consent;
