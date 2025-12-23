import Swal from 'sweetalert2'

export const showAddSuccessAlert = () => {

    const addConfirmMessage = "Anime has been added to your library!";

    Swal.fire({
        icon: 'success',
        title: 'Add complete!',
        icon: 'success',
        text: addConfirmMessage
    })
}

export const showEditSuccessAlert = () => {

    const editConfirmMessage = "Anime has been edited!";

    Swal.fire({
        icon: 'success',
        title: 'Edit complete!',
        icon: 'success',
        text: editConfirmMessage
    });
}

export const showDeleteConfirmAlert = () => {

    const deleteConfirmationQuestionAlertMessage = "Are you sure you want to delete this anime? Your actions cannot be reversed!";

    return Swal.fire({
        title: 'Confirm Deletion',
        icon: 'warning',
        showCancelButton: true,
        text: deleteConfirmationQuestionAlertMessage,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        return result.isConfirmed;
    });
}

export const showDeleteSuccessAlert = () => {

    const deleteConfirmMessage = "Anime has been deleted!";

    Swal.fire({
        icon: 'success',
        title: 'Deleted',
        icon: 'success',
        text: deleteConfirmMessage    
    })
}

export const showAnimeAlreadyExistsAlert = () => {

    const showAlertExists = "This show already exists in your library!";

    Swal.fire({
        icon: 'info',
        title: 'Info',
        text: showAlertExists
    })
}