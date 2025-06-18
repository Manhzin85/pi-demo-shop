import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function getProducts() {
  const data = localStorage.getItem("pi-demo-products");
  return data ? JSON.parse(data) : [];
}

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const products = getProducts();
    const found = products.find((p) => p.id === id);
    setProduct(found);
  }, [id]);

  if (!product) {
    return (
      <div style={styles.container}>
        <div style={styles.header}>
          <button style={styles.backBtn} onClick={() => navigate("/")}>
            ← Trang chủ
          </button>
        </div>
        <div style={{ textAlign: "center", marginTop: 40, color: "#888" }}>
          Không tìm thấy sản phẩm.
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate("/")}>
          ← Trang chủ
        </button>
        <span style={{ fontWeight: "bold", color: "#8a4cff" }}>Chi tiết sản phẩm</span>
      </div>
      <div style={styles.detailBox}>
        <img src={product.image} alt={product.title} style={styles.img} />
        <div style={styles.info}>
          <h2 style={{ margin: "10px 0" }}>{product.title}</h2>
          <div style={styles.price}>{product.price} Pi</div>
          <div style={{ margin: "8px 0 14px 0", color: "#777" }}>{product.category}</div>
          <div style={{ fontSize: 15, whiteSpace: "pre-line" }}>{product.desc || "Không có mô tả."}</div>
          <div style={{ marginTop: 18, fontSize: 14, color: "#888" }}>
            Đăng bởi: <b>{product.user}</b>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { background: "#f5f3ff", minHeight: "100vh", paddingBottom: 40 },
  header: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "18px 24px 10px 24px",
    background: "#fff",
    borderBottom: "1px solid #ececec",
    position: "sticky",
    top: 0,
    zIndex: 99,
  },
  backBtn: {
    background: "#eee",
    border: "none",
    borderRadius: 6,
    padding: "6px 14px",
    cursor: "pointer",
    fontSize: 16,
  },
  detailBox: {
    margin: "28px auto",
    maxWidth: 420,
    background: "#fff",
    borderRadius: 12,
    padding: 18,
    boxShadow: "0 2px 8px #0001",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  img: {
    width: "100%",
    maxWidth: 300,
    height: 220,
    objectFit: "cover",
    borderRadius: 9,
    background: "#eee",
    marginBottom: 16,
  },
  info: { width: "100%" },
  price: { color: "#8a4cff", fontWeight: "bold", fontSize: 18, marginBottom: 2 },
};

export default ProductDetail;
    
