

export const getUsedHours = (date: string) => {
    try {
        const currentDate = new Date();
        const createDate = new Date(date);
        const timeDifference = currentDate.getTime() - createDate.getTime();
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
        return hoursDifference;
    } catch (err) {
        console.log(err)
        return 0
    }
}