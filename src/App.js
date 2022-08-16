import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  // 화면 불러오고 있는 중에 로딩 표시 처리
  const [isLoading, setIsLoading] = useState(false);
  //에러상태 처리
  const [error, setError] = useState(null);

  //------useCallback을 사용한 경우
  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    // try {} catch{}로 오류 처리 해주기
    // GET요청 관련 fetch
    try {
      const response = await fetch(
        "https://udemy-react-http-77f19-default-rtdb.firebaseio.com/movies.json"
      ); // firebase 링크끝에 /movies.json이라고 추가함
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      setMovies(loadedMovies);
    } catch (error) {
      setError(error.message); // "Something went wrong"
    }
    setIsLoading(false);
  }, []);

  // 최초 로딩 시 영화 리스트 보이도록 함
  // 의존성 배열에 [fetchMoviesHandler]을 넣어주면 변화가 있을때마다 업데이트가 될수 있는 반면 infinite loop를 만들게 될수도 있다.
  // 이를 방지하기 위해 useCallback을 사용한다
  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  // POST 요청 관련 fetch
  async function addMovieHandler(movie) {
    const response = await fetch(
      "https://udemy-react-http-77f19-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data); // 결과값: {name: '-N9a7yhrMvCi1GK_E4-1'} // firebase에서 정한 아이디
  }

  // -----1. useCallback 사용하지 않은 경우!
  // async function fetchMoviesHandler() {
  //   setIsLoading(true);
  //   setError(null);

  //   // try {} catch{}로 오류 처리 해주기
  //   try {
  //     const response = await fetch("https://swapi.dev/api/films");
  //     if (!response.ok) {
  //       throw new Error("Something went wrong");
  //     }
  //     const data = await response.json();

  //     const transformedMovies = data.results.map((movieData) => {
  //       return {
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_date,
  //       };
  //     });
  //     setMovies(transformedMovies);
  //   } catch (error) {
  //     setError(error.message); // "Something went wrong"
  //   }
  //   setIsLoading(false);
  // }

  //---------.then 사용한 경우
  // function fetchMoviesHandler() {
  //   // fetch('url', {method:GET}) 두번째 인자의 디폴트 값이 GET이므로 여기서는 굳이 쓸 필요가 없음
  //   fetch("https://swapi.dev/api/films")
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       //https://swapi.dev/api/films 여기서 제공하는 프로퍼티명이랑 Movie.js에서 props뒤에 쓴 형식이 다름. fetch로 받아올때 Movie.js에서 쓰인 형식으로 바꿔서 받아오는 처리 해주기!
  //       const transformedMovies = data.results.map((movieData) => {
  //         return {
  //           id: movieData.episode_id,
  //           title: movieData.title,
  //           openingText: movieData.opening_crawl,
  //           releaseDate: movieData.release_date,
  //         };
  //       });
  //       setMovies(transformedMovies);
  //     });
  // }

  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  let content = <p>Found no movies</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
