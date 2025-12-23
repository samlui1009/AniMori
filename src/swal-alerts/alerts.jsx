import Swal from 'sweetalert2'

const addConfirmMessage = "Anime has been added to your library!";
const editConfirmMessage = "Anime has been edited!";
const deleteConfirmationQuestionAlertMessage = "Are you sure you want to delete this anime? Your actions cannot be reversed!";
const deleteConfirmMessage = "Anime has been deleted!";

export const showAddSuccessAlert = (addConfirmMessage) => {
    Swal.fire({
        icon: 'success',
        title: 'Success',
        icon: 'success',
        text: addConfirmMessage
    })
}

export const showEditSuccessAlert = (editConfirmMessage) => {
    Swal.fire({
        icon: 'success',
        title: 'Success',
        icon: 'success',
        text: editConfirmMessage
    });
}

export const showDeleteConfirmAlert = (deleteConfirmationQuestionAlertMessage) => {
    Swal.fire({
        title: 'Confirm Deletion',
        icon: 'warning',
        showCancelButton: true,
        text: deleteConfirmationQuestionAlertMessage,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    })
}

export const showDeleteSuccessAlert = (deleteConfirmMessage) => {
    Swal.fire({
        icon: 'success',
        title: 'Deleted',
        icon: 'success',
        text: deleteConfirmMessage    
    })
}