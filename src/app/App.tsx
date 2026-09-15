import { useState } from "react";

import LoginPage from "../modules/auth/LoginPage";

import UserListPage from "../modules/users/UserListPage";
import RoleListPage from "../modules/roles/RoleListPage";
import SubjectListPage from "../modules/subjects/SubjectListPage";
import QuestionListPage from "../modules/question/QuestionListPage";

export default function App() {

    const [loggedIn, setLoggedIn] =
        useState(false);

    const [selectedModule, setSelectedModule] =
        useState<string>("");

    const handleLoginSuccess = () => {
        setLoggedIn(true);
    };

    if (!loggedIn) {

        return (
            <LoginPage
                onLoginSuccess={handleLoginSuccess}
            />
        );
    }

    if (selectedModule === "users") {

        return (
            <UserListPage
                onBack={() =>
                    setSelectedModule("")
                }
            />
        );
    }

    if (selectedModule === "roles") {

        return (
            <RoleListPage
                onBack={() =>
                    setSelectedModule("")
                }
            />
        );
    }

    if (selectedModule === "subjects") {

        return (
            <SubjectListPage
                onBack={() =>
                    setSelectedModule("")
                }
            />
        );
    }

    if (selectedModule === "questions") {

        return (
            <QuestionListPage
                onBack={() =>
                    setSelectedModule("")
                }
            />
        );
    }

    return (

        <div style={{ padding: "40px" }}>

            <h1>
                HSUSA Training Management System
            </h1>

            <h2>
                Main Menu
            </h2>

            <button
                onClick={() =>
                    setSelectedModule("users")
                }
            >
                Users
            </button>

            <br />
            <br />

            <button
                onClick={() =>
                    setSelectedModule("roles")
                }
            >
                Roles
            </button>

            <br />
            <br />

            <button
                onClick={() =>
                    setSelectedModule("subjects")
                }
            >
                Subjects
            </button>

            <br />
            <br />

            <button
              onClick={() =>
                  setSelectedModule("questions")
              }
          >
              Question Bank
          </button>

            <br />
            <br />

        </div>


    );
}