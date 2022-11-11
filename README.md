# 원티드 프리온보딩 3-1 4팀

# 팀 소개

| 이름         | github                                                                                                  |
| ------------ | ------------------------------------------------------------------------------------------------------- |
| 임거정(팀장) | https://github.com/dgd03146/pre-onboarding-7th-3-1-4                                                    |
| 고현수       | https://github.com/movie42/pre-onboarding-7th-3-1-4                                                     |
| 김하영       | https://github.com/Fibo4487/wanted-preOnBoarding-7th/tree/master/3-1/default-typescript-cra-main        |
| 박라영       | https://github.com/rieulp/clinical-trials-input-clone                                                   |
| 박호준       | https://github.com/ganeodolu/wanted-pre-onboarding-course/tree/main/pre-onboarding-7th-3-1-4-search-bar |
| 이슬         | https://github.com/seul-dev/pre-onboarding-7th-3-1-4                                                    |
| 조윤정       | https://github.com/yunjjeongjo/pre-onboarding-7th-3-1-4                                                 |
| 최지영       | https://github.com/ohtmm/search_auto-recommend                                                          |

# 환경 설정 및 실행 방법

## 환경설정

1. NodeJS 16.14.2에서 실행하는 것을 권장합니다.

## 클라이언트 설치 및 실행

```
// 클라이언트 설치
npm ci

// 클라이언트 실행
npm start
```

## 실행

서버 실행 - [저장소 링크](https://github.com/walking-sunset/assignment-api_7th)

```
npm install
npm start
```

# 디렉토리 구조

```jsx
📦src
│   ├── components
│   │   ├── Input
│   │   ├── RecommendInput
│   │   ├── assets
│   │   └── layouts
│   ├── lib
│   │   ├── api
│   │   ├── hooks
│   │   ├── styles
│   │   ├── utils
│   │		└── typings
│   ├── pages
│   │   └── Main
│   ├── router
└── └── service

```

- Components
  - 컴포넌트 폴더는 전역으로 공유되는 컴포넌트가 들어있습니다. 한 페이지(레알 SPA)이지만 어플리케이션을 확장한다고 하였을 때, 공유될 수 있는 자원이라고 생각된 것들을 넣었습니다.
- Pages
  - 페이지 역할을 하는 컴포넌트가 있습니다.
- router
  - 라우터 컴포넌트가 저장되어있습니다.
- lib
  - 라이브러리 폴더는 http클라이언트 클래스, 캐싱 클래스, 커스텀 훅, 스타일 등이 모여있는 폴더입니다. 관련 기능을 이곳에 정리하는 방법이 훅이나 interface 등을 다른 관련된 곳에 흩어지게 만드는 것 보다 더 효율적이라고 생각했습니다.
- service
  - 캐싱, 검색 서비스 클래스가 모여있는 폴더입니다. 라이브러리와 같은 곳에 포함되는 것보다 독립된 성격이 더 강하여 따로 분리했습니다.

# BEST PRACTICE

## 1. API 호출 최적화

- debounce 적용

```jsx
// useDebounce
import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState < T > value;

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;

// 구현부

debounce(func, delay);
```


## 2. 검색어 추천 및 키보드 이동

1. 검색어 창에 검색어를 입력합니다.  

![ezgif com-gif-maker](https://user-images.githubusercontent.com/44064122/201107196-1cb35dcd-3603-481a-b353-77374f169554.gif)

2. 검색어 추천 목록이 나오면 키보드 방향키중 위, 아래 키로 탐색할 수 있습니다.  

![ezgif com-gif-maker (1)](https://user-images.githubusercontent.com/44064122/201107216-68834e46-3c28-485a-8014-842d49f9cac4.gif)

3. 검색어를 다시 입력하고 싶다면 ESC 키를 누르세요.  

![ezgif com-gif-maker (2)](https://user-images.githubusercontent.com/44064122/201107234-6ff5a4b0-7cc7-4cb6-b314-d3ef6c85a9ac.gif)

4. 검색어를 탐색하다가 검색을 하고 싶다면 엔터키를 누르세요. 그러면 쿼리 스트링이 URL에 들어갑니다.  

![ezgif com-gif-maker (3)](https://user-images.githubusercontent.com/44064122/201107253-eb172e2a-c81f-4552-ad2a-2f9cd81c9685.gif)



## 3. 검색 키워드 볼드 처리

- 정규표현식을 이용하여 검색어와 일치하는 텍스트 찾기
  - () 괄호로 정규식을 감싸면 전체 문자열에서 리턴을 검색한 후 괄호 안에 일치하는 텍스트를 저장합니다.
  - 위의 정규식에 split을 사용하여 배열로 반환합니다.
  - 배열 중에 일치하는 텍스트가 있으면 볼드처리를 합니다.
  ```jsx
  export const highlightText = (
    text: string,
    inputValue: string
  ): JSX.Element => {
    const regex = new RegExp(`(${inputValue})`, "gi");
    return (
      <>
        {text.split(regex).map((word, idx) => {
          return word === inputValue ? (
            <span className="highlight" key={idx}>
              {word}
            </span>
          ) : (
            word
          );
        })}
      </>
    );
  };
  ```

## 4. 데이터 캐싱 방법

- Map instance를 가진 CacheService class를 구현해 Cache data를 관리했습니다.

  ```jsx
  // CacheService.ts
  export class CacheService<K, V> {
    private state;

    constructor() {
      this.state = new Map<K, V>();
    }

    setCache(key: K, value: V) {
      this.state.set(key, value);
    }

    getCache(key: K) {
      return this.state.get(key);
    }

    hasCache(key: K) {
      return this.state.has(key);
    }
  }
  ```

- input의 입력값을 key값으로 정하여 Map에서 key값을 먼저 확인하고 key값이 없으면 데이터를 state에 저장하고 key값이 있으면 기존의 key값의 데이터를 불러오는 방식으로 캐싱을 적용하였습니다.

  ```jsx
  // SearhService.ts
  import { APIServiceImpl } from "@/lib/api/API";
  import { CacheService } from "./CacheService";

  interface SearchService<T> {
    search(query: string): Promise<T>;
  }

  export class SearchServiceImpl<T> implements SearchService<T> {
    private api;
    private cache;

    constructor(api: APIServiceImpl) {
      this.api = api;
      this.cache = new CacheService<string, T>();
    }

    async search(query: string) {
      if (this.cache.hasCache(query))
        return this.cache.getCache(query) || ([] as T);
      const { data } = await this.api.fetch<T>(`sick?sickNm_like=${query}`);
      this.cache.setCache(query, data);
      return data;
    }
  }
  ```

- 데이터 캐싱에 Object가 아닌 Map을 사용한 이유
  - Map은 키-값 쌍의 빈번한 추가 및 제거에서 Object보다 더 나은 성능을 보입니다.
  - 검색창의 입력값이 모두 쿼리키(string)이 될 수 있고, 검색값이 변경될 때마다 빈번하게 크기가 큰 검색 데이터가 데이터가 추가, 로드되기 때문에 Object보다 Map 자료구조형이 더 적합하다고 판단하여 Map객체에 캐시를 저장했습니다.

```jsx
// 2 million operations per each test

Map int key set took:  968 ms
Obj int key set took:  2,490 ms

Map int key get took:  45 ms
Obj int key get took:  2,563 ms

Map string key set took:  1,889 ms
Obj string key set took:  3,181 ms

Map string key get took:  148 ms
Obj string key get took:  6,946 ms

//https://azimi.io/es6-map-with-react-usestate-9175cd7b409b
```

- Cache 인터페이스 역시 사용할 수 있지만 exprerimental 한 기능이므로 구형 브라우저를 고려하여 사용하지 않았습니다. [https://developer.mozilla.org/ko/docs/Web/API/Cache](https://developer.mozilla.org/ko/docs/Web/API/Cache)

## 5. 클래스 의존성 주입

---

```tsx
import axios, { AxiosInstance } from "axios";

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;

  constructor(protected readonly baseURL: string) {
    this.instance = axios.create({
      baseURL: this.baseURL
    });
  }
}
```

```jsx
export interface APIService {
  fetch: <T>(endPoint: string) => Promise<AxiosResponse<T, any>>;
}

export class APIServiceImpl extends HttpClient implements APIService {
  constructor(baseURL: string) {
    super(baseURL);
  }

  fetch = <T>(endPoint: string) => {
    console.info("calling api");
    return this.instance.get < T > this.baseURL + endPoint;
  };
}
```

```tsx
// SearhService.ts
import { APIServiceImpl } from "@/lib/api/API";
import { CacheService } from "./CacheService";

interface SearchService<T> {
  search(query: string): Promise<T>;
}

export class SearchServiceImpl<T> implements SearchService<T> {
  private api;
  private cache;

  constructor(api: APIServiceImpl) {
    this.api = api;
    this.cache = new CacheService<string, T>();
  }

  async search(query: string) {
    if (this.cache.hasCache(query))
      return this.cache.getCache(query) || ([] as T);
    const { data } = await this.api.fetch<T>(`sick?sickNm_like=${query}`);
    this.cache.setCache(query, data);
    return data;
  }
}
```

클래스 외부에서 객체를 생성하여 객체를 클래스 내부에 주입하고있습니다. 한 클래스가 변경이 될 경우 다른 클래스가 변경될 필요성이 적고 리팩토링, 테스트, 유연성과 확장성을 높이기 위해 클래스간 의존성 주입을 하도록 구현하였습니다.

- HttpClient
  - HttpClient 클래스트는 abstract로 선언하였는데 다른곳에서 인스턴스로 사용되는 것을 방지하고 싶었습니다.
- APIService
  - HttpClient를 상속 받아서 HttpClient의 instance를 사용하고 http 요청을 하는 클래스입니다.
- SearchService
  - 선언 시점이 아닌 생성 시점에 타입을 입력받아 다양한 타입을 지원해주고 생성된 인스턴스의 타입 범위를 줄이기 위해 타입 매개변수인 제네릭으로 타입입력을 받았습니다.

# 문제 해결

## 1. 방향키 이동 버그

- 엘리먼트가 선택되지 않는 문제
  방향키를 이동할 때 키 이벤트 안에서 숫자 상태의 증감으로 index를 지정해서 추천 검색어에 하이라이팅이 되도록 코드를 작성했습니다. 그런데 문제는 state의 초기값이 0이면 추천 검색어의 첫번째 엘리먼트가 지정되지 않는 문제가 있었습니다.

```tsx
// 버그 코드
const handleIncreaseCount = (dataLength: number) => (pre: number) => {
  return pre < 0 ? 0 : pre + 1;
};
```

아마도 위의 코드는 단순 더하기 빼기만 하기 때문에 범위가 넘어가면 따로 분기 처리를 해주어야합니다. 그리고 수고스럽게 분기 처리를 하였다고 하더라도 정상적인 실행이 보장되지 않았습니다.

```tsx
// 해결 된 코드
const handleIncreaseCount = (dataLength: number) => (pre: number) => {
  return pre < 0 ? 0 : (pre + 1) % dataLength;
};
```

다행이 라영님이 작성하신 코드를 보고 해결을 할 수 있었는데요. index 증감의 상태를 데이터의 길이로 나누어 주면 그 범위 안에서만 최종 상태를 반환하게 됩니다. 그래서 첫번째 값을 하이라이팅 해주지 못하는 문제를 해결할 수 있었습니다.

## 2. 이벤트 발생이 동시에 일어난다???

방향키를 눌렀을 때, input에 포커스를 잃도록 구현을 하고 싶었습니다. 그런데 blur 메서드가 동작하면 onChange가 한번 더 발생하였습니다. 그래서 “암”을 검색하고 화살표를 누르니 검색창에 “암암”이 되어서 추천 검색어가 모두 사라지는 문제가 있었습니다. 팀원 분들은 블러 이벤트가 발생하면 onChange는 반드시 한번 동작을 하게 된다고 답변을 해주셨습니다.

그래서 화살표 버튼을 눌렀을 때, isSelectBox라는 상태를 만들어 이것을 true 값으로 변경하게 하고 true 일때는 handleChange 함수 실행을 중단하도록 코드를 변경해 해결할 수 있었습니다.

```tsx
const [isSelectBox, setIsSelectBox] = useState(false);

const handleChange = (e) => {
  if (isSelectBox) {
    return;
  }
  // 아래 코드 생략
};

const handleKeydownchange = (e) => {
  // 코드 생략
  if (e.key === "ArrowUp") {
    setIsSelectBox(true);
    e.currentTarget.blur();
  }
};
```
