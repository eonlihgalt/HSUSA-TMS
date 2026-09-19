import { useState } from "react";
import LoginPage from "../modules/auth/LoginPage";
import UserListPage from "../modules/users/UserListPage";
import RoleListPage from "../modules/roles/RoleListPage";
import SubjectListPage from "../modules/subjects/SubjectListPage";
import QuestionListPage from "../modules/question/QuestionListPage";
import QualificationListPage from "../modules/qualifications/QualificationListPage";

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [selectedModule, setSelectedModule] = useState("");
    const backToMenu = () => setSelectedModule("");

    if (!loggedIn) return <LoginPage onLoginSuccess={() => setLoggedIn(true)} />;
    if (selectedModule === "users") return <UserListPage onBack={backToMenu} />;
    if (selectedModule === "roles") return <RoleListPage onBack={backToMenu} />;
    if (selectedModule === "subjects") return <SubjectListPage onBack={backToMenu} />;
    if (selectedModule === "questions") return <QuestionListPage onBack={backToMenu} />;
    if (selectedModule === "qualifications") return <QualificationListPage onBack={backToMenu} />;

    return (
        <main style={{ padding: "40px" }}>
            <h1>HSUSA Training Management System</h1>
            <h2>Main Menu</h2>
            <button onClick={() => setSelectedModule("users")}>Users</button><br /><br />
            <button onClick={() => setSelectedModule("roles")}>Roles</button><br /><br />
            <button onClick={() => setSelectedModule("subjects")}>Subjects</button><br /><br />
            <button onClick={() => setSelectedModule("questions")}>Question Bank</button><br /><br />
            <button onClick={() => setSelectedModule("qualifications")}>Qualifications</button>
        </main>
    );
}
