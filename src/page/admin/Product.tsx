import type { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { set } from "../../reducers/adminThemeReducer";

const Product = () => {
  const dispatch = useDispatch();
  const { theme, sidebarShow } = useSelector((state: RootState) => state.app);
  return (
    <div>
      <h3>SA Product</h3>
      <h4>{theme}</h4>
      <h4>{sidebarShow ? "a" : "b"}</h4>
      <button onClick={() => dispatch(set({ sidebarShow: !sidebarShow }))}>
        toggle sidebar
      </button>
    </div>
  );
};

export default Product;
