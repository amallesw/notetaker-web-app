import { useForm, Controller } from "react-hook-form";
import { useSelector } from "react-redux";
import Select from 'react-select';
import { createPage, createPageV2 } from "../features/notesSlice";
import { useDispatch } from "react-redux";


export default function AddNewPage2({ folderPos }) {

    const { register, handleSubmit, reset, formState, formState: { errors, isSubmitSuccessful }, control } = useForm();

    const { folders } = useSelector((state) => state.folders);

    console.log(folderPos);
    const dispatch = useDispatch();

    const onSubmit = submitData => {
        console.log("submitting...")
        console.log({ ...submitData, folderPos });
        dispatch(createPage({ ...submitData, folderPos }))
        // closeModal();
        reset({ "subfolderPos": "" })
    }

    const subfolderData = folders[folderPos].folder_components.map((subfolder, index) => {
        if (!subfolder.is_notepage) {
            return (
                {
                    value: index,
                    label: subfolder.elements.subfolder_name,
                    subfolder_name: subfolder.elements.subfolder_name,
                }
            );
        }
    })



    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>

                <p className="mt-8  p-1 text-red-400">Leave Select blank in order to add to <strong>{folders[folderPos].folder_name}</strong> directly</p>
                <Controller
                    name="subfolderPos"
                    control={control}
                    render={({ field }) => (
                        <Select
                            className="mt-2"
                            isClearable
                            {...field}
                            options={subfolderData}
                            placeholder="Select subfolder for new notepage"
                        />
                    )}
                />

                <div className="mt-4">
                    <input
                        className="w-full p-1 border-b rounded hover:border-gray-500"
                        placeholder="Notepage Name (required)"
                        {...register("notepage_name", { required: true })}
                    />
                </div>



                <div className="mt-8 ">
                    <button
                        type="submit"
                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    >
                        Next
                    </button>
                </div>
            </form>


        </>
    )
}