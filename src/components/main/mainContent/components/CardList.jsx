import React, { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { __getMainCardList } from "../../../../redux/modules/mainCardListSlice";

import styled from "styled-components";
import MainSurveySummeryCard from "./MainSurveySummeryCard";
import { useNavigate } from "react-router-dom";
import { baseURLApi } from "../../../../core/api";

const CardList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mainCardList = useSelector(
    (state) => state.mainCardList?.mainCardList.contents
  );

  useEffect(() => {
    dispatch(__getMainCardList({ page: 1, size: 9, sortBy: "최신순" }));
  }, []);

  const goSurveyHandler = async ({ surveyId }) => {
    try {
      const { data } = await baseURLApi.get("user");
      !data.data
        ? batch(() => {
            alert("로그인을 해주세요");
            navigate("/login");
          })
        : navigate(`/survey?surveyId=${surveyId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <SurveyContainer>
        {mainCardList?.map((card) => {
          return (
            <MainSurveySummeryCard
              key={card.surveyId}
              deadLine={card.dday}
              title={card.title}
              summary={card.summary}
              createdAt={card.createdAt}
              participant={card.participant}
              onClick={() => {
                goSurveyHandler({ surveyId: card.surveyId });
              }}
            />
          );
        })}
      </SurveyContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

const SurveyContainer = styled.div`
  display: grid;
  grid-row-gap: 3rem;
  grid-column-gap: 2.4rem;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  justify-items: center;

  width: 100%;
  margin-bottom: 3rem;
`;

export default CardList;
