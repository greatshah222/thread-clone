import React from "react";

const RightSidebar = () => {
	return (
		<div className="custom-scrollbar rightsidebar">
			<div className="flex flex-1 flex-col justify-start">
				<h3 className="text-heading4-medium text-light-1">Suggested Communities</h3>
			</div>
			<div className="flex flex-1 flex-col justify-start">
				<h3 className="text-heading4-medium text-light-1">Suggested Users</h3>
			</div>
		</div>
	);
};

export default RightSidebar;