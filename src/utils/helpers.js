export function timeAgo(dateString) {
  const now = new Date();
  const past = new Date(dateString);
  const diffInSeconds = Math.floor((now - past) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(diffInSeconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count > 1 ? "s" : ""} ago`;
    }
  }

  return "just now";
}

export function formatViews(views) {
  if (views >= 1e9) {
    return (views / 1e9).toFixed(1) + "B views";
  } else if (views >= 1e6) {
    return (views / 1e6).toFixed(1) + "M views";
  } else if (views >= 1e3) {
    return (views / 1e3).toFixed(1) + "K views";
  } else {
    return `${views} views`;
  }
}

export function formatDuration(durationInSeconds) {
  const totalSeconds = Math.floor(durationInSeconds);

  const hours = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60)
    .toString()
    .padStart(2, "0");
  const secs = (totalSeconds % 60).toString().padStart(2, "0");

  if (hours > 0) {
    return `${hours.toString().padStart(2, "0")}:${mins}:${secs}`;
  } else {
    return `${mins}:${secs}`;
  }
}

export function formatVideoData(video) {
  return {
    id: video._id,
    title: video.title,
    description: video.description,
    channel: video.owner?.fullname || "Unknown",
    channelId: video.owner?._id || "",
    avatar: video.owner?.avatar?.url || "",
    videoFile: video.videoFile?.url || "",
    thumbnail: video.thumbnail?.url || "",
    views: formatViews(video.views),
    time: timeAgo(video.createdAt),
    duration: formatDuration(video.duration),
  };
}

export function formatDate(isoString) {
  const date = new Date(isoString);

  const options = { day: "2-digit", month: "short", year: "numeric" };
  const [day, month, year] = date
    .toLocaleDateString("en-GB", options)
    .split(" ");

  return `${day} ${month}, ${year}`;
}