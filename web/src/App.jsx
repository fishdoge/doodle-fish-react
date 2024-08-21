import { Routes, Route } from "react-router-dom";
import Home from "./page/Home";
function App() {
    return (
        <div id="app" className="h-full">
            <Routes>
                <Route path="/" index element={<Home />}></Route>
            </Routes>
        </div>
    );
}

export default App;
