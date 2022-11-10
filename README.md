# TypeScript CRA with husky

## 구현 목표

- [한국임상정보](https://clinicaltrialskorea.com/) 검색영역 클론하기

## 배포 링크

[보러가기]()

## 개발 조건 및 환경

- TypeScript
- Recoil
  - api 요청을 최소화하기 위해 서버 데이터를 캐싱하는데 사용했습니다.
- styled-components
- axios

## 구현내용

### 서버 데이터 로컬 캐싱

캐싱을 어떻게 구현했는지에 대한 내용

#### 사용 라이브러리

- recoil을 사용해 서버 데이터를 캐싱했다.

#### 구현 방법

1. 서버 데이터를 로컬 캐싱할 state 생성한다.
   - **keyword**를 키로 **추천검색어(Sick)**을 값으로 갖는 `Map`을 기본값으로 설정했다.

```ts
import { atom } from "recoil";

export interface Sick {
  sickCd: string;
  sickNm: string;
}

export const sickListCacheAtom = atom<Map<string, Sick[]>>({
  key: "sickCache",
  default: new Map<string, Sick[]>()
});
```

2. **keyword**에 해당하는 데이터가 캐싱되어 있으면 캐싱 데이터를 리턴하고 없다면 api를 호출하고 데이터를 캐싱후 리턴한다.
   - 매개변수를 전달 할 수 있는 `selectorFamily`를 사용해서 `get` 콜백에 keyword값을 전달해 api를 호출한다.

```ts
export const getSickList = selectorFamily<Sick[], string>({
  key: "sickList",
  get:
    (keyword) =>
    async ({ get }) => {
      if (!keyword) return [];
      const cache = get(sickListCacheAtom); // 캐싱 데이터를 가진 state
      if (cache.has(keyword)) return cache.get(keyword) || [];
      console.info("calling api");
      const { data } = await api.get<Sick[]>("/sick", {
        params: { sickNm_like: keyword }
      });
      return data;
    }
});
```

3. `keyword`를 매개변수로 받는 hook을 만들어 사용한다.

```ts
export const getSickList = selectorFamily<Sick[], string>({
  key: "sickList",
  get:
    (keyword) =>
    async ({ get }) => {
      if (!keyword) return [];
      const cache = get(sickListCacheAtom);
      if (cache.has(keyword)) return cache.get(keyword) || [];
      console.info("calling api");
      const { data } = await api.get<Sick[]>("/sick", {
        params: { sickNm_like: keyword }
      });
      return data;
    }
});
```

### 입력마다 api 호출하지 않도록 api 호출 횟수를 줄이는 전략 수립 및 실행

#### 전략

- `debounce`방법을 사용해서 새로운 input event가 정해진 시간간격 안으로 발생하면 api 호출에 필요한 `keyword`값을 변경하지 않는 방법으로 입력마다 `keyword`값이 변경되어 api가 호출되지 않도록 처리한다.

#### 구현 방법

1. debounce 함수를 리턴하는 useDebounce hook을 구현한다.

```ts
import { useState } from "react";

export const useDebounce = () => {
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const debounce = (callback: () => void, ms: number): void => {
    clearTimeout(timer);
    const nTimer = setTimeout(callback, ms);
    setTimer(nTimer);
  };

  return debounce;
};
```

2. onInput event가 발생하면 keyword값을 변경하는 `setKeyword`를 debounce의 callback에서 처리한다.

```ts
// keyword: 사용자 입력 값, api 호출에 필요한 값
const debounce = useDebounce();
const [keyword, setKeyword] = useState(value);

const onInput = (e: React.FormEvent<HTMLFormElement>) => {
  let newKeyword = keyword;
  if (e.target instanceof HTMLInputElement) {
    if (newKeyword === e.target.value) return;
    newKeyword = e.target.value.trim();
  }
  debounce(() => {
    if (e.target instanceof HTMLInputElement) {
      setKeyword(newKeyword);
      setFocusIndex(-1);
    }
  }, 200);
};
```

### 키보드만으로 추천 검색어들로 이동 가능하도록 구현

#### 사용법

1. 검색창에 키워드를 입력한다.
2. 추천 검색어가 있을 때 위, 아래 방향 키보드를 눌러 추천 검색어로 이동한다.

#### 구현 방법

1. 선택된 추천 검색어를 저장할 state 선언

- 컴포넌트 안에 useState로 추천 검색어 index값을 가진 state를 생성한다. index가 0부터 시작하기 때문에 초기 값은 `-1`로 설정한다.

```ts
const [focusIndex, setFocusIndex] = React.useState<number>(-1);
```

2. 키 이벤트로 선택된 추천 검색어 변경
   - input에 위, 아래 방향 키보드 이벤트를 처리하기 위해서 `keyDownEventListener`을 추가한다.
   - 위, 아래 방향 키보드가 입력될 때, 커서 이동을 막기 위해 `e.preventDefault()` 추가한다.
   - 위, 아래 방향 키보드가 입력될 때, focusIndex값이 순회되도록 변경한다.
   - (추가) 현재 focusIndex가 가르키는 추천 검색어 값으로 input값을 변경한다. (Google 입력창 참고)

```ts
const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const key = ["ArrowDown", "ArrowUp"];

  if (key.includes(e.key)) {
    e.preventDefault();
    if (!sickData.length) return;
    let index = focusIndex;

    if (e.key === "ArrowDown") {
      index = focusIndex < 0 ? 0 : (focusIndex + 1) % sickData.length;
    } else if (e.key === "ArrowUp") {
      index =
        ((focusIndex < 0 ? 0 : focusIndex) - 1 + sickData.length) %
        sickData.length;
    }
    setFocusIndex(index);
    setValue(sickData[index].sickNm);
  }
};
```

3. 선택된 추천 검색어 강조 표시

- 추천 검색어 배열에서 focusIndex와 index가 같으면, RecommendBoxItem의 active 프로퍼티에 `true`값을 넘겨주었다. active가 `true`일 때 css 스타일링으로 강조 표시 했다.
- (추가) React.Ref를 사용해서 스크롤이 있는 경우, itemRef가 가르키고 있는 컴포넌트가 항상 세로로 중앙에 위치하도록 처리했다.

```ts
/**
 * - RecommendBoxContainer: 추천 검색어 목록 콘테이너 (ul)
 * - RecommendBoxItem: 추천 검색어 아이템 컴포넌트 (li)
 * - data: 추천검색어[]
 * - itemRef: 추천검색어 아이템 컴포넌트 ref (React.Ref)
 */

useEffect(() => {
  if (focusIndex !== undefined && focusIndex >= 0) {
    if (itemRef.current) {
      itemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }
  }
}, [focusIndex]);

return (
  <RecommendBoxContainer>
    <p className="label">추천 검색어</p>
    {data.length ? (
      data.map(({ sickCd, sickNm }, index) => (
        <RecommendBoxItem
          index={index}
          keyword={keyword}
          value={sickNm}
          key={sickCd}
          active={index === focusIndex}
          ref={index === focusIndex ? itemRef : undefined}
        />
      ))
    ) : (
      <RecommendAltContainer>{alt}</RecommendAltContainer>
    )}
  </RecommendBoxContainer>
);
```

## 프로젝트 실행방법

### 설치

```shell
npm install
```

### 실행

1. API 실행 - [저장소 링크](https://github.com/walking-sunset/assignment-api_7th)

```shell
npm install
npm start
```

2. 프로젝트 실행

```shell
npm start
```
