// import { useCallback, useReducer } from "react";

// enum InputActionType {
//   INPUT_CHANGE = "INPUT_CHANGE",
// }

// interface InputAction {
//   type: InputActionType;
//   value: string;
//   isValid: boolean;
//   inputId: string;
// }

// interface InputType {
//   value: string;
//   isValid: boolean;
// }

// interface InputStateType {
//   [key: string]: InputType;
// }

// const formReducer = (state: any, action: InputAction) => {
//   switch (action.type) {
//     case "INPUT_CHANGE": {
//       let formIsValid = true;
//       for (const input in state.formInputs) {
//         if (input === action.inputId) {
//           formIsValid = formIsValid && action.isValid;
//         } else {
//           formIsValid = formIsValid && state.formInputs[input].isValid;
//         }
//       }
//       return {
//         ...state,
//         inputs: {
//           ...state.inputs,
//           [action.inputId]: { value: action.value, isValid: action.isValid },
//         },
//         isValid: formIsValid,
//       };
//     }

//     default:
//       return state;
//   }
// };

// export const useForm = (initialInputs: any, formValidity: boolean) => {
//   const [formState, dispatch] = useReducer(formReducer, {
//     formInputs: initialInputs,
//     formValidity: formValidity,
//   });

//   const inputHandler = useCallback(
//     (value: string, isValid: boolean, id: string) => {
//       dispatch({
//         type: InputActionType.INPUT_CHANGE,
//         value: value,
//         isValid: isValid,
//         inputId: id,
//       });
//     },
//     []
//   );

//   return [formState, inputHandler];
// };
