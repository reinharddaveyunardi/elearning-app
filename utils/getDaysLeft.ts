export const calculateDaysLeft = (date: string, t: any) => {
    const today = new Date();
    const difference = new Date(date).getTime() - today.getTime();
    const totalDays = Math.ceil(difference / (1000 * 3600 * 24));

    let statusMessage = "";
    let isOverdue = false;

    if (totalDays < 0) {
        statusMessage = t("due.overdue");
        isOverdue = true;
    } else if (totalDays === 0) {
        statusMessage = t("due.today");
    } else if (totalDays === 1) {
        statusMessage = t("due.tomorrow");
    } else {
        statusMessage = `${totalDays} ${t("due.daysLeft")}`;
    }

    return {totalDays, isOverdue, statusMessage};
};
