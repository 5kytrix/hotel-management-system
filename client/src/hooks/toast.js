
import { toast } from 'react-toastify';

export function createToast(error, type = 'error') {
    toast(error.message ? error.message : error, {
        position: toast.POSITION.TOP_CENTER,
        hideProgressBar: true,
        type,
    });
}
