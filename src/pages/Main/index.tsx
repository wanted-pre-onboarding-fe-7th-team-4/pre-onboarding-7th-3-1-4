import RecommendInput from "@/components/RecommendInput";
import { MainPageContainer, Title } from "./styles";

const Main = () => {
  return (
    <MainPageContainer>
      <div>
        <Title>
          <h1>
            국내 모든 임상시험 검색하고
            <br />
            온라인으로 참여하기
          </h1>
        </Title>
        <RecommendInput />
      </div>
    </MainPageContainer>
  );
};

export default Main;
