import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const swal = withReactContent(Swal);

export const basicAl = (
  cb = null,
  options = { icon: 'success', title: '기본' },
) => {
  swal
    .fire({
      ...options,
      confirmButtonText: '확인',
      scrollbarPadding: false,
      onOpen: () => {
        swal.isVisible();
      },
    })
    .then(() => {
      if (cb) {
        cb();
      }
    });
};

export const confirmAl = (
  cb = null,
  options = { icon: 'warning', title: '삭제하시겠습니까?' },
) => {
  Swal.fire({
    ...options,
    showCancelButton: true,
    cancelButtonText: '취소',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '삭제',
  }).then(({ value }) => {
    if (value) {
      cb();
    }
  });
};
