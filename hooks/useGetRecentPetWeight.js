export const useGetRecentPetWeight = (weightHistory) => {
    return (
        weightHistory.reduce((latest, current) => {
            return new Date(current.date) > new Date(latest.date) ? current : latest;
        })
    )
}