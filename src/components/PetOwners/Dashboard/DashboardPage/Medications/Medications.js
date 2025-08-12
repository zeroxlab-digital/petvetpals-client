"use client"
import { useEffect, useState } from "react"
import Button from "@/components/Common/Button/Button"
import { Plus, Trash2, Clock, Info, MoreVertical, CheckCircle, Download, Pencil, Pill } from "lucide-react"
import {
    useDeleteMedicationMutation,
    useGetMedicationsQuery,
    useUpdateMedicationMutation,
} from "@/redux/services/petApi"
import { PetSpinner } from "@/components/Common/Loader/PetSpinner"
import ModalPopup from "@/components/Common/ModalPopup/ModalPopup"
import Actions from "@/components/Common/Actions/Actions"
import MedicationDetails from "./MedicationDetails"
import { toast } from "react-toastify"
import ScheduledReminders from "./ScheduledReminders"
import AddUpdateMedication from "./AddUpdateMedication"
import ScheduleReminder from "./ScheduleReminder"
import { displayValue } from "@/utils/displayValue"
import { HiEllipsisHorizontal, HiInformationCircle, HiOutlineCheckCircle, HiOutlineInformationCircle, HiOutlineTrash, HiPlus } from "react-icons/hi2"
import { HiDocumentDownload, HiOutlineDownload, HiOutlinePencilAlt } from "react-icons/hi"

const Medications = ({ petId }) => {
    const [activeTab, setActiveTab] = useState("current-medications")
    const notify = (message, type) => {
        toast(message, { type: type, autoClose: 1000 })
    }
    const { data, isLoading, error } = useGetMedicationsQuery({ petId })
    const [medications, setMedications] = useState([])

    useEffect(() => {
        try {
            if (data?.success) {
                setMedications(data.medications)
            }
        } catch (error) {
            console.error("Error fetching medications:", error)
        }
    }, [data])

    // Filter out the medications that are currently ongoing vs not
    const ongoingMedications = medications.filter((med) => med.is_ongoing === true)
    const notOngoingMedications = medications.filter((med) => med.is_ongoing === false)

    const [openPopup, setOpenPopup] = useState(false)
    const [viewDetails, setViewDetails] = useState(false)
    const [selectedMed, setSelectedMed] = useState(null)

    const handleView = (med) => {
        setSelectedMed(med)
        setViewDetails(true)
    }

    const [editMedication, setEditMedication] = useState(null)
    const handleEdit = async (medication) => {
        try {
            setEditMedication(medication)
        } catch (error) {
            console.log(error)
            toast.error("There was an error while trying to edit this!", { autoClose: 1000 })
        }
    }

    const [deleteMedication, { }] = useDeleteMedicationMutation()
    const handleDelete = async (medicationId) => {
        try {
            const response = await deleteMedication({ medicationId }).unwrap()
            if (response.success) {
                notify("Medication deleted successfully!", "success")
            }
        } catch (error) {
            console.log("Error deleting medication:", error)
            notify("Failed to delete medication", "error")
        }
    }

    const [updateMedication, { isError, isSuccess }] = useUpdateMedicationMutation()
    const handleMarkComplete = async (medicationId) => {
        try {
            console.log(medicationId)
            const response = await updateMedication({
                medicationId,
                medicationData: {
                    is_ongoing: false,
                },
            }).unwrap()
            if (response.success) {
                notify("Medication marked as completed successfully!", "success")
            }
        } catch (error) {
            console.error("Error marking medication as complete:", error)
            notify("Failed to mark medication as completed", "error")
        }
    }

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between max-sm:flex-wrap">
                <h2 className="font-semibold text-lg">Medications & Treatment</h2>
                {activeTab === "schedule-reminders" && (
                    <>
                        <div className="flex items-center gap-2 max-sm:grid max-sm:grid-cols-2 max-sm:mt-2">
                            <Button
                                variant={"primaryOutline"}
                                classNames={"max-sm:px-3 text-sm !hover:bg-gray-200"}
                            >
                                <HiOutlineDownload className="text-lg" /> Export Calendar
                            </Button>
                            <Button
                                onClick={() => setOpenPopup(true)}
                                variant={"primary"}
                                classNames={"max-sm:px-3 text-sm "}
                            >
                                <HiPlus className="text-lg" /> Add to Reminder
                            </Button>
                        </div>
                        <ModalPopup
                            isOpen={openPopup}
                            onClose={() => setOpenPopup(false)}
                            title={"Schedule Medication"}
                            icon={<Clock />}
                            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
                        >
                            <ScheduleReminder
                                onClose={() => setOpenPopup(false)}
                                ongoingMedications={ongoingMedications}
                                petId={petId}
                            />
                        </ModalPopup>
                    </>
                )}
                {activeTab === "current-medications" && (
                    <>
                        <Button
                            onClick={() => setOpenPopup(true)}
                            variant={"primaryOutline"}
                            classNames={"max-sm:mt-2 text-sm"}
                        >
                            <HiPlus className="text-lg" /> Add Medication
                        </Button>
                        <ModalPopup
                            isOpen={openPopup}
                            onClose={() => setOpenPopup(false)}
                            title={"Add Medication"}
                            icon={<Pill />}
                            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
                        >
                            <AddUpdateMedication onClose={() => setOpenPopup(false)} petId={petId} />
                        </ModalPopup>
                    </>
                )}
            </div>

            <div className=" space-x-3 overflow-x-auto whitespace-nowrap max-md:max-w-max bg-gray-50 border border-gray-200 rounded-md p-2 scrollbar-thin scrollbar-thumb-gray-300">
                {[
                    { key: "current-medications", label: "Current Medications" },
                    { key: "schedule-reminders", label: "Schedule & Reminders" },
                    { key: "medication-history", label: "Medication History" },
                ].map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`py-2 px-4 rounded-md font-medium text-sm ${activeTab === tab.key
                            ? "bg-primary text-white"
                            : "bg-white text-gray-600 hover:bg-[#f6f0f4] hover:text-primary border border-gray-200"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Current Medications */}
            {activeTab === "current-medications" &&
                (isLoading ? (
                    <div>
                        <PetSpinner />
                    </div>
                ) : (
                    <>
                        {/* MOBILE CARDS */}
                        <div className="md:hidden grid grid-cols-1 gap-6">
                            {ongoingMedications.length > 0 ? (
                                ongoingMedications.map((med, idx) => (
                                    <article
                                        key={idx}
                                        tabIndex={0}
                                        className="bg-white border border-opacity-30 rounded-2xl flex flex-col justify-between shadow-md hover:shadow-xl duration-200"
                                    >
                                        <header className="flex flex-row justify-between items-center p-5 bg-primary text-white rounded-t-2xl">
                                            <div>
                                                <h3 className="text-lg font-semibold text-white truncate mb-1">{displayValue(med.medication)}</h3>
                                                <p className="uppercase text-xs font-semibold tracking-wider text-gray-200 select-none">
                                                    {displayValue(med.dosage)} - {displayValue(med.frequency)}
                                                </p>
                                            </div>
                                            <div className="relative cursor-pointer duration-150 rounded-md border w-9 h-9 flex items-center justify-center">
                                                {/* <HiEllipsisHorizontal className="text-2xl text-white" /> */}
                                                <Actions
                                                    actions={[
                                                        {
                                                            label: "View Details",
                                                            icon: <HiOutlineInformationCircle />,
                                                            onClick: () => handleView(med),
                                                        },
                                                        {
                                                            label: "Edit",
                                                            icon: <HiOutlinePencilAlt />,
                                                            onClick: () => handleEdit(med),
                                                        },
                                                        {
                                                            label: "Delete",
                                                            icon: <HiOutlineTrash />,
                                                            onClick: () => handleDelete(med._id),
                                                        },
                                                        {
                                                            label: "Mark Completed",
                                                            icon: <HiOutlineCheckCircle />,
                                                            onClick: () => handleMarkComplete(med._id),
                                                        },
                                                    ]}
                                                />
                                            </div>
                                        </header>
                                        <main className="flex-grow text-gray-900 p-5">
                                            <section className="space-y-3">
                                                <div>
                                                    <h4 className="text-sm font-semibold mb-0.5 select-none">Next Due</h4>
                                                    <p className="text-gray-700 leading-relaxed">
                                                        {displayValue(
                                                            new Date(med.next_due).toLocaleDateString("en-US", {
                                                                month: "long",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            }),
                                                        )}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-semibold mb-0.5 select-none">Remaining</h4>
                                                    <p className="text-gray-700 leading-relaxed">{displayValue(med.remaining)}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-semibold mb-0.5 select-none">Reason</h4>
                                                    <p className="text-gray-700 leading-relaxed">{displayValue(med.reason)}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-semibold mb-0.5 select-none">Prescribed by</h4>
                                                    <p className="text-gray-700 leading-relaxed">{displayValue(med.prescribed_by?.fullName)}</p>
                                                </div>
                                            </section>
                                        </main>
                                        {/* View Details Modal */}
                                        {viewDetails && (
                                            <ModalPopup
                                                isOpen={viewDetails}
                                                onClose={() => setViewDetails(false)}
                                                title={selectedMed.medication + " Details"}
                                                icon={<Info />}
                                                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
                                            >
                                                <MedicationDetails med={selectedMed} setViewDetails={setViewDetails} />
                                            </ModalPopup>
                                        )}
                                        {/* Edit Medication Modal */}
                                        {editMedication && (
                                            <ModalPopup
                                                isOpen={editMedication}
                                                onClose={() => setEditMedication(null)}
                                                title={"Edit Medication Details"}
                                                icon={<Pencil />}
                                                className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
                                            >
                                                <AddUpdateMedication
                                                    petId={petId}
                                                    medication={editMedication}
                                                    onClose={() => setEditMedication(null)}
                                                />
                                            </ModalPopup>
                                        )}
                                    </article>
                                ))
                            ) : (
                                <div className="text-center py-10 text-gray-500 max-md:hidden">
                                    <Pill className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                                    <p className="text-lg font-medium">No Current Medications Found!</p>
                                    <p className="text-sm">Add a new medication to get started</p>
                                </div>
                            )}
                        </div>

                        {/* DESKTOP/TABLET TABLE */}
                        {ongoingMedications.length > 0 ?
                            <div className="hidden md:block h-screen border rounded-md bg-white overflow-x-auto">
                                <table className="w-full border-collapse p-5">
                                    <thead>
                                        <tr className="text-left text-xs md:text-sm text-gray-500 border-b ">
                                            <th className="p-5">Medication</th>
                                            <th className="p-5">Dosage</th>
                                            <th className="p-5">Frequency</th>
                                            <th className="p-5">Next due</th>
                                            <th className="p-5">Remaining</th>
                                            <th className="p-5">Reason</th>
                                            <th className="p-5">Prescribed by</th>
                                            <th className="p-5 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ongoingMedications.map((med, index) => (
                                            <tr key={index} className="border-b last:border-none hover:bg-gray-50 ">
                                                <td className="px-5 py-3 text-sm">{med.medication || "N/A"}</td>
                                                <td className="px-5 py-3 text-sm">{med.dosage || "N/A"}</td>
                                                <td className="px-5 py-3 text-sm">{med.frequency || "N/A"}</td>
                                                <td className="px-5 py-3 text-sm">
                                                    {new Date(med.next_due).toLocaleDateString("en-US", {
                                                        month: "long",
                                                        year: "numeric",
                                                        day: "numeric",
                                                    }) || "N/A"}
                                                </td>
                                                <td className="px-5 py-3 text-sm">{displayValue(med.remaining)}</td>
                                                <td className="px-5 py-3 text-sm">{displayValue(med.reason)}</td>
                                                <td className="px-5 py-3 text-sm">{displayValue(med.prescribed_by?.fullName)}</td>
                                                <td className="px-5 py-3 text-sm flex justify-end ">
                                                    <span className="relative cursor-pointer hover:bg-gray-100 duration-150 rounded-md w-9 h-9 flex items-center justify-center">
                                                        {/* <HiEllipsisHorizontal className="text-2xl text-gray-800" /> */}
                                                        <Actions
                                                            actions={[
                                                                {
                                                                    label: "View Details",
                                                                    icon: <HiOutlineInformationCircle />,
                                                                    onClick: () => handleView(med),
                                                                },
                                                                {
                                                                    label: "Edit",
                                                                    icon: <HiOutlinePencilAlt />,
                                                                    onClick: () => handleEdit(med),
                                                                },
                                                                {
                                                                    label: "Delete",
                                                                    icon: <HiOutlineTrash />,
                                                                    onClick: () => handleDelete(med._id),
                                                                },
                                                                {
                                                                    label: "Mark Completed",
                                                                    icon: <HiOutlineCheckCircle />,
                                                                    onClick: () => handleMarkComplete(med._id),
                                                                },
                                                            ]}
                                                        />
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {/* View Details Modal */}
                                {viewDetails && (
                                    <ModalPopup
                                        isOpen={viewDetails}
                                        onClose={() => setViewDetails(false)}
                                        title={selectedMed.medication + " Details"}
                                        icon={<Info />}
                                    // className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
                                    >
                                        <MedicationDetails med={selectedMed} setViewDetails={setViewDetails} />
                                    </ModalPopup>
                                )}
                                {/* Edit Medication Modal */}
                                {editMedication && (
                                    <ModalPopup
                                        isOpen={editMedication}
                                        onClose={() => setEditMedication(null)}
                                        title={"Edit Medication Details"}
                                        icon={<Pencil />}
                                    // className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
                                    >
                                        <AddUpdateMedication
                                            petId={petId}
                                            medication={editMedication}
                                            onClose={() => setEditMedication(null)}
                                        />
                                    </ModalPopup>
                                )}
                            </div>
                            :
                            <div className="text-center py-10 text-gray-500">
                                <Pill className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                                <p className="text-lg font-medium">No Current Medication Found!</p>
                                <p className="text-sm">Add new medications to get started</p>
                            </div>
                        }
                    </>
                ))}

            {/* Medication History */}
            {activeTab === "medication-history" &&
                (isLoading ? (
                    <div>
                        <PetSpinner />
                    </div>
                ) : (
                    <>
                        {/* MOBILE CARDS */}
                        <div className="md:hidden grid grid-cols-1 gap-6">
                            {notOngoingMedications.length > 0 ? (
                                notOngoingMedications.map((med, idx) => (
                                    <article
                                        key={idx}
                                        tabIndex={0}
                                        className="bg-white border border-opacity-30 rounded-2xl flex flex-col justify-between shadow-md hover:shadow-xl duration-200"
                                    >
                                        <header className="flex flex-row justify-between items-center p-5 bg-primary rounded-t-2xl text-white">
                                            <div>
                                                <h3 className="text-lg font-semibold truncate mb-1">{displayValue(med.medication)}</h3>
                                                <p className="uppercase text-xs font-semibold tracking-wider text-gray-200 select-none">
                                                    {displayValue(med.dosage)} - {displayValue(med.frequency)}
                                                </p>
                                            </div>
                                            <span
                                                onClick={() => {
                                                    setOpenPopup(true);
                                                    setSelectedMed(med);
                                                }}
                                                className="cursor-pointer border rounded-md w-9 h-9 flex items-center justify-center"
                                            >
                                                <HiOutlineInformationCircle className="text-xl text-white" />
                                            </span>
                                        </header>
                                        <main className="flex-grow text-gray-900 p-5">
                                            <section className="space-y-3">
                                                <div>
                                                    <h4 className="text-sm font-semibold mb-0.5 select-none">Start Date</h4>
                                                    <p className="text-gray-700 leading-relaxed">
                                                        {displayValue(
                                                            new Date(med.start_date).toLocaleDateString("en-US", {
                                                                month: "long",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            }),
                                                        )}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-semibold mb-0.5 select-none">End Date</h4>
                                                    <p className="text-gray-700 leading-relaxed">
                                                        {displayValue(
                                                            new Date(med.end_date).toLocaleDateString("en-US", {
                                                                month: "long",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            }),
                                                        )}
                                                    </p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-semibold mb-0.5 select-none">Reason</h4>
                                                    <p className="text-gray-700 leading-relaxed">{displayValue(med.reason)}</p>
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-semibold mb-0.5 select-none">Prescribed by</h4>
                                                    <p className="text-gray-700 leading-relaxed">{displayValue(med.prescribed_by?.fullName)}</p>
                                                </div>
                                            </section>
                                        </main>
                                        {openPopup && (
                                            <ModalPopup
                                                isOpen={openPopup}
                                                onClose={() => setOpenPopup(false)}
                                                title={selectedMed.medication + " Medication Details"}
                                                icon={<Info />}
                                            // className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
                                            >
                                                <MedicationDetails med={selectedMed} setOpenPopup={setOpenPopup} />
                                            </ModalPopup>
                                        )}
                                    </article>
                                ))
                            ) : (
                                <div className="text-center py-10 text-gray-500 max-md:hidden">
                                    <Pill className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                                    <p className="text-lg font-medium">No Medication History Found!</p>
                                    <p className="text-sm">Completed medications will appear here</p>
                                </div>
                            )}
                        </div>

                        {/* DESKTOP/TABLET TABLE */}
                        {notOngoingMedications.length > 0 ?
                            <div className="hidden md:block h-screen border rounded-md bg-white overflow-x-auto">
                                <table className="w-full border-collapse p-5">
                                    <thead>
                                        <tr className="text-left text-xs md:text-sm text-gray-500 border-b ">
                                            <th className="p-5">Medication</th>
                                            <th className="p-5">Dosage</th>
                                            <th className="p-5">Frequency</th>
                                            <th className="p-5">Start date</th>
                                            <th className="p-5">End date</th>
                                            <th className="p-5">Reason</th>
                                            <th className="p-5">Prescribed by</th>
                                            <th className="p-5 text-right">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {notOngoingMedications.map((med, index) => (
                                            <tr key={index} className="border-b last:border-none hover:bg-gray-50 ">
                                                <td className="px-5 py-3 text-sm">{med.medication}</td>
                                                <td className="px-5 py-3 text-sm">{med.dosage}</td>
                                                <td className="px-5 py-3 text-sm">{med.frequency}</td>
                                                <td className="px-5 py-3 text-sm">
                                                    {new Date(med.start_date).toLocaleDateString("en-US", {
                                                        month: "long",
                                                        year: "numeric",
                                                        day: "numeric",
                                                    }) || "N/A"}
                                                </td>
                                                <td className="px-5 py-3 text-sm">
                                                    {new Date(med.end_date).toLocaleDateString("en-US", {
                                                        month: "long",
                                                        year: "numeric",
                                                        day: "numeric",
                                                    }) || "N/A"}
                                                </td>
                                                <td className="px-5 py-3 text-sm">{med.reason || "N/A"}</td>
                                                <td className="px-5 py-3 text-sm">{med.prescribed_by?.fullName || "N/A"}</td>
                                                <td className="px-5 py-3 text-sm flex justify-end">
                                                    <span
                                                        onClick={() => {
                                                            setOpenPopup(true);
                                                            setSelectedMed(med);
                                                        }}
                                                        className="cursor-pointer border hover:bg-gray-100 duration-150 rounded-md w-9 h-9 flex items-center justify-center"
                                                    >
                                                        <HiOutlineInformationCircle className="text-xl text-gray-800" />
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {openPopup && (
                                    <ModalPopup
                                        isOpen={openPopup}
                                        onClose={() => setOpenPopup(false)}
                                        title={selectedMed.medication + " Medication Details"}
                                        icon={<Info />}
                                    // className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
                                    >
                                        <MedicationDetails med={selectedMed} setOpenPopup={setOpenPopup} />
                                    </ModalPopup>
                                )}
                            </div>
                            :
                            <div className="text-center py-10 text-gray-500">
                                <Pill className="mx-auto h-12 w-12 mb-4 text-gray-400" />
                                <p className="text-lg font-medium">No Medication History Found!</p>
                                <p className="text-sm">Completed medications will appear here</p>
                            </div>
                        }
                    </>
                ))}

            {/* Schedule & Reminders */}
            {activeTab === "schedule-reminders" && (
                <ScheduledReminders petId={petId} ongoingMedications={ongoingMedications} />
            )}
        </div>
    )
}

export default Medications