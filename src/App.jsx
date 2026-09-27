import ProductFilter from "./components/ProductFilter";
import RegisterForm from "./components/RegisterForm";

function App() {
    return (
        <div className="min-h-screen bg-gray-100">
            <h1 className="py-6 text-center text-2xl font-bold">
                Buổi 36 - React Optimization & Form
            </h1>

            <ProductFilter />

            <RegisterForm />
        </div>
    );
}

export default App;