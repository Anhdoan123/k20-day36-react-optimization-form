import {useMemo, useState} from "react";

const PRODUCTS = Array.from({ length: 1000 }, (_, index) => {
    console.log("test");
    const categories = [
        "Điện thoại",
        "Laptop",
        "Thời trang",
        "Gia dụng",
        "Sách",
    ];

    return {
        id: index + 1,
        name: `Sản phẩm ${index + 1}`,
        category: categories[index % categories.length],
        price: (index % 50) * 20 + 100,
        rating: (index % 5) + 1,
    };
});

function ProductFilter() {
    const [count, setCount] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("default");

    const filteredProducts = useMemo(() => {
        console.log("ĐANG LỌC VÀ SẮP XẾP LẠI DANH SÁCH...");

        let result = PRODUCTS.filter((product) => {
            const matchKeyword = product.name
                .toLowerCase()
                .includes(keyword.toLowerCase());

            const matchCategory =
                category === "all" || product.category === category;

            return matchKeyword && matchCategory;
        });

        if (sort === "asc") {
            result.sort((a, b) => a.price - b.price);
        }

        if (sort === "desc") {
            result.sort((a, b) => b.price - a.price);
        }

        return result;
    }, [keyword, category, sort]);

    return (
        <div className="mx-auto max-w-6xl p-6">
            {/* Kiểm tra re-render */}
            <div className="mb-6 rounded-xl bg-white p-5 shadow">
                <h3 className="mb-3 text-lg font-semibold">
                    Kiểm tra re-render
                </h3>

                <p className="mb-3">
                    Count: <span className="font-bold">{count}</span>
                </p>

                <button
                    onClick={() => setCount(count + 1)}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    Tăng count
                </button>
            </div>

            {/* Bộ lọc */}
            <div className="mb-6 rounded-xl bg-white p-5 shadow">
                <h3 className="mb-4 text-lg font-semibold">
                    Bộ lọc sản phẩm
                </h3>

                <div className="flex flex-wrap gap-3">
                    {/* Tìm kiếm */}
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500"
                    />

                    {/* Danh mục */}
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-2"
                    >
                        <option value="all">Tất cả</option>
                        <option value="Điện thoại">Điện thoại</option>
                        <option value="Laptop">Laptop</option>
                        <option value="Thời trang">Thời trang</option>
                        <option value="Gia dụng">Gia dụng</option>
                        <option value="Sách">Sách</option>
                    </select>

                    {/* Sắp xếp */}
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="rounded-lg border border-gray-300 px-4 py-2"
                    >
                        <option value="default">Mặc định</option>
                        <option value="asc">Giá tăng dần</option>
                        <option value="desc">Giá giảm dần</option>
                    </select>
                </div>
            </div>

            {/* Số lượng sản phẩm */}
            <div className="mb-4">
                <p className="font-medium">
                    Tìm thấy{" "}
                    <span className="text-blue-600">
                        {filteredProducts.length}
                    </span>{" "}
                    / {PRODUCTS.length} sản phẩm
                </p>
            </div>

            {/* Danh sách sản phẩm */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.length === 0 ? (
                    <p className="col-span-full py-10 text-center text-gray-500">
                        Không tìm thấy sản phẩm phù hợp.
                    </p>
                ) : (
                    filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                        >
                            <h4 className="mb-2 font-semibold">
                                {product.name}
                            </h4>

                            <p className="text-sm text-gray-500">
                                Danh mục: {product.category}
                            </p>

                            <p className="mt-2 font-medium">
                                Giá: {product.price}k
                            </p>

                            <p className="mt-1">
                                Rating: {"⭐".repeat(product.rating)}
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default ProductFilter;