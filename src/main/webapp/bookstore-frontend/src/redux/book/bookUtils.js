import BookService from "../../services/BookService";

export const addSelectedData = (allSelectedRows, newRow) => {
    if (allSelectedRows.find((element) => element.bookId === newRow.bookId)) {
        return allSelectedRows.filter((element) => element.bookId !== newRow.bookId);
      } else {
        // allSelectedRows((selectedData) => [...selectedData, newRow]);
        return [...allSelectedRows, newRow]
      }
}


//  export const fetchGenreList = () => {
//       BookService.getGenre()
//         .then((response) => {
//           console.log(response)
//           return response.data;
//         })
//         .catch((error) =>{
//           return error.response.data.message;
//         })
//   };

//   export const fetchLanguageList = async () => {
//     try {
//       const result = await BookService.getLanguage();
//       return result.data;
//     } catch (error) {
//       return error.response.data.message;
//     }
//   };