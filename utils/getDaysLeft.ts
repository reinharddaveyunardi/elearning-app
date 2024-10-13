export const calculateDaysLeft = (date: string) => {
    const today = new Date();
    const difference = new Date(date).getTime() - today.getTime();
    const totalDays = Math.ceil(difference / (1000 * 3600 * 24));

    let statusMessage = "";
    let isOverdue = false;

    if (totalDays < 0) {
        statusMessage = "Overdue";
        isOverdue = true;
    } else if (totalDays === 0) {
        statusMessage = "Due today";
    } else if (totalDays === 1) {
        statusMessage = "Tommorow";
    } else {
        statusMessage = `${totalDays} days left`;
    }

    return {totalDays, isOverdue, statusMessage};
};
