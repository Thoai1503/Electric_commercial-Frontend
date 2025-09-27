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
  CToast,
  CToastBody,
  CToastClose,
  CToaster,
} from "@coreui/react";
import { useRef, useState } from "react";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import Card from "@mui/joy/Card";
import { useAddImageModals } from "../../../../module/admin/hook/product_detail_page/useAddImageModal";

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
  const exampleToast = (
    <CToast>
      <div className="d-flex">
        <CToastBody>Hello, world! This is a toast message.</CToastBody>
        <CToastClose className="me-2 m-auto" />
      </div>
    </CToast>
  );
  const [toast, addToast] = useState<any>();
  const {
    images,
    handleFileChange,
    handleSubmit,
    selectedImages,
    handleDelete,
  } = useAddImageModals(product_id, variant_id, setVisible, () =>
    addToast(exampleToast)
  );

  const toaster = useRef(null);

  const handleDeleteSelectedImage = (index: number) => {
    // Add logic to remove selected image from preview
    console.log("Delete selected image at index:", index);
  };

  return (
    <>
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
            {images?.map((item) => (
              <Card
                orientation="horizontal"
                size="sm"
                key={item.id}
                variant="outlined"
                sx={{ position: "relative" }}
              >
                <AspectRatio ratio="1" sx={{ minWidth: 200 }}>
                  <img
                    srcSet={`${item.url}?h=120&fit=crop&auto=format&dpr=2 2x`}
                    src={`http://electriccatalogstoreapi123456789.somee.com/uploads/${item.url}?h=120&fit=crop&auto=format`}
                    alt={item.url}
                  />
                </AspectRatio>
                {/* Delete button for existing images */}
                <Box
                  onClick={() => handleDelete(item.id)}
                  sx={{
                    position: "absolute",
                    top: 4,
                    right: 4,
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    borderRadius: "50%",
                    width: 24,
                    height: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "bold",
                    color: "#666",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 0, 0, 0.1)",
                      color: "red",
                    },
                    transition: "all 0.2s ease",
                  }}
                >
                  ×
                </Box>
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
                <Card key={index} sx={{ width: 80, position: "relative" }}>
                  <AspectRatio ratio="1">
                    <img src={src} alt={`selected-${index}`} />
                  </AspectRatio>
                  {/* Delete button for selected images */}
                  <Box
                    onClick={() => handleDeleteSelectedImage(index)}
                    sx={{
                      position: "absolute",
                      top: 2,
                      right: 2,
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: "50%",
                      width: 20,
                      height: 20,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: "#a11818ff",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                      "&:hover": {
                        backgroundColor: "rgba(255, 0, 0, 0.1)",
                        color: "red",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    ×
                  </Box>
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
      <CButton color="primary" onClick={() => addToast(exampleToast)}>
        Send a toast
      </CButton>
      <CToaster
        className="p-3"
        placement="top-end"
        push={toast}
        ref={toaster}
      />
    </>
  );
};

export default AddImageModal;
