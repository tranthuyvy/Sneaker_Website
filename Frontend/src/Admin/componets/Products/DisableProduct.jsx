import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import api from "../../../config/api"
import { toast } from "react-toastify";
import errorMessagesEn from "../../../Lang/en.json";
import errorMessagesVi from "../../../Lang/vi.json";
import { useSelector } from 'react-redux';
const DisableProduct = (props) => {
    let { open, setOpen, id, name, fetchProducts, currentPage } = props
    console.log(open);
    const lang = useSelector((state) => state);
    const errorMessages = lang === "vi" ? errorMessagesVi : errorMessagesEn;
    const handleClose = () => {
        setOpen(false)
    }
    const handleSave = async () => {
        try {
            let res = await api.put(`/api/v1/product/disable?id=${id}`
            );
            handleClose();
            fetchProducts(currentPage);
            toast.success(errorMessages[res.data.code], {
                autoClose: 1000,
            });

            // navigate("/admin/products")
        } catch (error) {
            if (error.response && error.response.status === 500) {
                toast.error(errorMessages[error.response.data.code],
                    { autoClose: 1000 })
            } else {
                const accountErrorCode = "103";
                toast.error(errorMessages[accountErrorCode], {
                    autoClose: 1000,
                });
            }
        }
    }
    return (
        <Dialog
            open={open}
            // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                VÔ HIỆU HÓA
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Bạn có muốn ngưng kinh doanh sản phẩm {name} ?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Hủy</Button>
                <Button onClick={handleSave} autoFocus>
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DisableProduct;