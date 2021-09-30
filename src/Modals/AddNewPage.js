import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { useSelector } from 'react-redux';
import AddNewPage2 from './AddNewPage2';

export default function AddNewPage({ showModal, setShowModal }) {

    const { folders } = useSelector((state) => state.folders);
    const [openP2, setOpenP2] = useState(false);
    const [openP1, setOpenP1] = useState(true);
    const [folderPos, setFolderPos] = useState(0);

    const folderData = folders.map((folder, index) => ({
        value: index,
        label: folder.folder_name,
        folder_name: folder.folder_name,
    }));

    function closeModal() {
        setOpenP2(false);
        setShowModal(false);
        setOpenP1(true);
    }

    const { handleSubmit, reset, control } = useForm();

    const onSubmit = submitData => {
        reset({ "folderPos": "" })
        setOpenP2(true);
        setOpenP1(false);
        setFolderPos(submitData.folderPos.value);

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

                            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Create New Page
                                </Dialog.Title>

                                
                                {openP1 ? (
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <Controller
                                            name="folderPos"
                                            control={control}
                                            render={({ field }) => (
                                                <Select
                                                    className="mt-8"
                                                    isClearable
                                                    {...field}
                                                    options={folderData}
                                                    placeholder="Select folder for new notepage (required)"
                                                />
                                            )}
                                        />

                                        <div>
                                            <input
                                                type="submit"
                                                className="mt-8 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                                            />
                                        </div>
                                    </form>

                                ) : null}


                                {openP2 ? (
                                    <AddNewPage2 folderPos={folderPos} closeModal={closeModal} />
                                ) : null}




                            </div>

                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>) : null}


        </>
    )
}