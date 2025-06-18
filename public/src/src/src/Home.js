import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function getProducts() {
  const data = localStorage.getItem("pi-demo-products");
  return data ? JSON.parse(data) : [];
}

function Home() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const username = localStorage.getItem("pi-demo-user");

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const filtered = products.filter((p) => {
    const kw = search.toLowerCase();
    return (
      p.title.toLowerCase().includes(kw) ||
      p.desc.toLowerCase().includes(kw) ||
      p.category.toLowerCase().includes(kw)
    );
  });

  const handleLogout = () => {
    localStorage.removeItem("pi-demo-user");
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <span style={styles.logo}>🟣 Pi Demo Shop</span>
        <span>
          Xin chào, <b>{username}</b>
          <button style={styles.logoutBtn} onClick={handleLogout}>
            Thoát
          </button>
        </span>
      </header>
      <div style={styles.searchWrap}>
        <input
          style={styles.search}
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to="/add" style={styles.addBtn}>
          + Đăng sản phẩm
        </Link>
      </div>
      <div style={styles.grid}>
        {filtered.length === 0 && (
          <div style={{ textAlign: "center", color: "#888", marginTop: 40 }}>
            Chưa có sản phẩm nào.
          </div>
        )}
        {filtered.map((product) => (
          <div
            key={product.id}
            style={styles.card}
            onClick={() => navigate(`/detail/${product.id}`)}
          >
            <img
              src={product.image}
              alt={product.title}
              style={styles.img}
            />
            <div style={styles.title}>{product.title}</div>
            <div style={styles.price}>{product.price} Pi</div>
            <div style={styles.category}>{product.category}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { background: "#f5f3ff", minHeight: "100vh" },
  header: {
    display: "flex",
    justifyContent: "space-between",
    padding: "18px 24px 10px 24px",
    alignItems: "center",
    background: "#fff",
    borderBottom: "1px solid #ececec",
    position: "sticky",
    top: 0,
    zIndex: 99,
  },
  logo: { color: "#8a4cff", fontWeight: "bold", fontSize: 20 },
  logoutBtn: {
    marginLeft: 16,
    background: "#eee",
    border: "none",
    borderRadius: 6,
    padding: "5px 12px",
    cursor: "pointer",
  },
  searchWrap: {
    display: "flex",
    padding: "18px 24px 10px 24px",
    gap: 8,
    alignItems: "center",
  },
  search: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #bbb",
    fontSize: 17,
  },
  addBtn: {
    background: "#8a4cff",
    color: "#fff",
    textDecoration: "none",
    padding: "10px 16px",
    borderRadius: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(160px,1fr))",
    gap: 18,
    padding: 24,
  },
  card: {
    background: "#fff",
    padding: 12,
    borderRadius: 10,
    boxShadow: "0 2px 6px #0001",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "box-shadow 0.2s",
  },
  img: {
    width: "100%",
    height: 120,
    objectFit: "cover",
    borderRadius: 8,
    marginBottom: 8,
    background: "#ececec",
  },
  title: { fontWeight: "bold", fontSize: 15, marginBottom: 2 },
  price: { color: "#8a4cff", fontWeight: "bold", fontSize: 15, marginBottom: 2 },
  category: { fontSize: 12, color: "#777" },
};

export default Home;
            
