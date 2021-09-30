import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { createSubFolder } from '../features/notesSlice';
import { useSelector } from 'react-redux';

export default function AddNewItem({ showModal, setShowModal }) {

    const { folders } = useSelector((state) => state.folders);

    const folderData = folders.map((folder, index) => ({
        value: index,
        label: folder.folder_name,
        folder_name: folder.folder_name,
    }));

    const dispatch = useDispatch();

    function closeModal() {
        setShowModal(false);
    }

    const { register, handleSubmit, reset, formState: { errors }, control } = useForm();

    const onSubmit = submitData => {
        dispatch(createSubFolder({ ...submitData }))
        closeModal();
        reset({ "subfolder_name": "" })
    }

    return (
        <>
            {showModal ? (<Transition appear show={true} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto"
                    onClose={closeModal}
                >
                    <div className="min-h-screen px-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span
                            className="inline-block h-screen align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Create Subfolder
                                    </Dialog.Title>

                                    <Controller
                                        name="folderPos"
                                        isClearable
                                        control={control}
                                        render={({ field }) => (
                                            <Select
                                                className="mt-8"
                                                {...field}
                                                options={folderData}
                                                placeholder="Select folder"
                                            />
                                        )}
                                    />
                                    <div className="mt-4">
                                        <input
                                            className="w-full p-1 border-b rounded hover:border-gray-500"
                                            placeholder="Subfolder name"
                                            {...register("subfolder_name", { required: true })}
                                        />
                                        {errors.exampleRequired && <span>This field is required</span>}
                                    </div>
                                    <div className="mt-8 ">
                                        <button
                                            type="submit"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                        >
                                            Create Subfolder
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>) : null}


        </>
    )
}