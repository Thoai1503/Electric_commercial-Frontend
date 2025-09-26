import {
  CButton,
  CCol,
  CFormInput,
  CFormLabel,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from "@coreui/react";
import { useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";

interface Prop {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  variant_id: number;
  product_id: number;
}

const AddImageModal = ({
  visible,
  setVisible,
  variant_id,
  product_id,
}: Prop) => {
  const data = [
    {
      src: "https://images.unsplash.com/photo-1502657877623-f66bf489d236",
      title: "Night view",
      description: "4.21M views",
    },
    {
      src: "https://images.unsplash.com/photo-1527549993586-dff825b37782",
      title: "Lake view",
      description: "4.74M views",
    },
    {
      src: "https://images.unsplash.com/photo-1532614338840-ab30cf10ed36",
      title: "Mountain view",
      description: "3.98M views",
    },
  ];
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      // lưu file để submit
      setSelectedFiles((prev) => [...prev, ...files]);

      // tạo preview
      const filesArray = files.map((file) => URL.createObjectURL(file));
      setSelectedImages((prev) => [...prev, ...filesArray]);
    }
  };

  const handleSubmit = async () => {
    if (selectedFiles.length === 0) {
      alert("Vui lòng chọn ít nhất 1 ảnh!");
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("images", file);
    });
    formData.append("product_id", String(product_id));
    formData.append("variant_id", String(variant_id));
    try {
      const response = await fetch(
        `https://localhost:7084/api/productimage/variant/${variant_id}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) throw new Error("Upload failed");

      const result = await response.json();
      console.log("✅ Upload thành công:", result);

      // reset
      setSelectedFiles([]);
      setSelectedImages([]);
      setVisible(false);
    } catch (err) {
      console.error("❌ Upload error:", err);
      alert("Upload thất bại!");
    }
  };

  return (
    <CModal
      alignment="center"
      scrollable
      visible={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="VerticallyCenteredScrollableExample2"
    >
      <CModalHeader>
        <CModalTitle id="VerticallyCenteredScrollableExample2">
          Modal title
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        {/* Section ảnh demo có sẵn */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            py: 1,
            overflow: "auto",
            width: 450,
            scrollSnapType: "x mandatory",
            "& > *": {
              scrollSnapAlign: "center",
            },
            "::-webkit-scrollbar": { display: "none" },
          }}
        >
          {data.map((item) => (
            <Card
              orientation="horizontal"
              size="sm"
              key={item.title}
              variant="outlined"
            >
              <AspectRatio ratio="1" sx={{ minWidth: 200 }}>
                <img
                  srcSet={`${item.src}?h=120&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.src}?h=120&fit=crop&auto=format`}
                  alt={item.title}
                />
              </AspectRatio>
            </Card>
          ))}
        </Box>

        {/* Input upload */}
        <CRow className="mb-3">
          <CCol md={12}>
            <CFormLabel htmlFor="image">Hình ảnh sản phẩm</CFormLabel>
            <CFormInput
              type="file"
              id="image"
              multiple
              name="image"
              onChange={handleFileChange}
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
            />
            <small className="text-muted">
              Chấp nhận file: JPEG, JPG, PNG, GIF, WEBP. Tối đa 5MB
            </small>
          </CCol>
        </CRow>

        {/* Section preview ảnh đã chọn */}
        {selectedImages.length > 0 && (
          <Box
            sx={{
              display: "flex",
              gap: 1,
              py: 1,
              flexWrap: "wrap",
            }}
          >
            {selectedImages.map((src, index) => (
              <Card key={index} sx={{ width: 80 }}>
                <AspectRatio ratio="1">
                  <img src={src} alt={`selected-${index}`} />
                </AspectRatio>
              </Card>
            ))}
          </Box>
        )}
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => setVisible(false)}>
          Close
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>
          Save changes
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default AddImageModal;
