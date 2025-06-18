data) : [];
  products.unshift(product);
  localStorage.setItem("pi-demo-products", JSON.stringify(products));
}

const categories = [
  "Quần áo",
  "Điện tử",
  "Gia dụng",
  "Khác",
];

function AddProduct() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [captured, setCaptured] = useState(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);
  const videoRef = useRef();
  const navigate = useNavigate();

  const startCamera = async () => {
    setError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
    } catch {
      setError("Không thể bật camera. Nếu bạn dùng máy tính, hãy thử chọn ảnh từ thư viện.");
    }
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    setCaptured(canvas.toDataURL("image/jpeg"));

    // Tắt camera
    let tracks = video.srcObject?.getTracks();
    tracks?.forEach((track) => track.stop());
  };

  const clearPhoto = () => {
    setCaptured(null);
    setError("");
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setCaptured(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !captured) {
      setError("Vui lòng nhập đủ tên, giá và chụp ảnh sản phẩm.");
      return;
    }
    setUploading(true);
    const newProduct = {
      id: Date.now().toString(),
      title,
      desc,
      category,
      price,
      image: captured,
      user: localStorage.getItem("pi-demo-user"),
      createdAt: new Date().toISOString(),
    };
    saveProduct(newProduct);
    setTimeout(() => {
      setUploading(false);
      navigate("/");
    }, 700);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.backBtn} onClick={() => navigate("/")}>
          ← Trang chủ
        </button>
        <span style={{ fontWeight: "bold", color: "#8a4cff" }}>Đăng sản phẩm mới</span>
      </div>
      <form style={styles.form} onSubmit={handleSubmit}>
        {!captured && (
          <div style={styles.camBox}>
            <video ref={videoRef} width={260} height={180} autoPlay muted style={{ borderRadius: 9, background: "#eee" }} />
            <div style={{ margin: "10px 0" }}>
              <button type="button" style={styles.camBtn} onClick={startCamera}>
                Bật camera
              </button>
              <button type="button" style={styles.camBtn} onClick={takePhoto}>
                Chụp ảnh
              </button>
            </div>
            <div style={{ marginTop: 4 }}>
              <label style={styles.fileLabel}>
                Hoặc chọn ảnh từ thư viện
                <input type="file" accept="image/*" style={{ display: "none" }} onChange={handleFile} />
              </label>
            </div>
          </div>
        )}
        {captured && (
          <div style={{ textAlign: "center" }}>
            <img src={captured} alt="Ảnh sản phẩm" style={{ maxWidth: 260, borderRadius: 9 }} />
            <div>
              <button type="button" style={styles.camBtn} onClick={clearPhoto}>
                Chụp lại
              </button>
            </div>
          </div>
        )}
        <input
          type="text"
          placeholder="Tên sản phẩm"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="number"
          placeholder="Giá bán (Pi)"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={styles.input}
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.input}>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <textarea
          placeholder="Mô tả sản phẩm (không bắt buộc)"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          style={styles.textarea}
        />
        {error && <div style={styles.error}>{error}</div>}
        <button type="submit" style={styles.submitBtn} disabled={uploading}>
          {uploading ? "Đang đăng..." : "Đăng sản phẩm"}
        </button>
      </form>
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
  form: {
    margin: "28px auto",
    maxWidth: 320,
    background: "#fff",
    borderRadius: 12,
    padding: 18,
    display: "flex",
    flexDirection: "column",
    gap: 14,
    boxShadow: "0 2px 8px #0001",
  },
  camBox: {
    textAlign: "center",
    marginBottom: 8,
  },
  camBtn: {
    margin: "0 7px",
    background: "#8a4cff",
    color: "#fff",
    border: "none",
    borderRadius: 7,
    padding: "8px 16px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  fileLabel: {
    background: "#eee",
    color: "#333",
    fontSize: 13,
    borderRadius: 7,
    padding: "6px 14px",
    cursor: "pointer",
    display: "inline-block",
  },
  input: {
    padding: 10,
    borderRadius: 8,
    border: "1px solid #bbb",
    fontSize: 16,
  },
  textarea: {
    minHeight: 60,
    padding: 10,
    borderRadius: 8,
    border: "1px solid #bbb",
    fontSize: 16,
    resize: "vertical",
  },
  error: {
    color: "#e00",
    textAlign: "center",
    marginBottom: 8,
    fontSize: 15,
  },
  submitBtn: {
    background: "#8a4cff",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "12px",
    fontWeight: "bold",
    fontSize: 17,
    cursor: "pointer",
    marginTop: 6,
  },
};

export default AddProduct;
    
