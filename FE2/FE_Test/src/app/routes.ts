import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { ExamList } from "./pages/ExamList";
import { ExamDetail } from "./pages/ExamDetail";
import { TakeExam } from "./pages/TakeExam";
import { ExamResult } from "./pages/ExamResult";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Materials } from "./pages/Materials";
import { Profile } from "./pages/Profile";
import { FlashcardDecks } from "./pages/FlashcardDecks";
import { FlashcardPlay } from "./pages/FlashcardPlay";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: "exams", Component: ExamList },
      { path: "exams/:id", Component: ExamDetail },
      { path: "take-exam/:id", Component: TakeExam },
      { path: "results/:id", Component: ExamResult },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "materials", Component: Materials },
      { path: "profile", Component: Profile },
      { path: "flashcards", Component: FlashcardDecks },
      { path: "flashcard/:id", Component: FlashcardPlay },
    ],
  },
]);