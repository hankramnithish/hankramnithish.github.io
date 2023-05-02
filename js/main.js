(function ($) {

	"use strict";

	var fullHeight = function () {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function () {
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
		$('#sidebar').toggleClass('active');
	});

})(jQuery);

function switchTab(tabName) {
	document.getElementById("tab-content").innerHTML = getContent(tabName)
}
function getContent(tabName) {
	console.log(tabName);
	switch (tabName) {
		case 'intro':
			return `<div class="row tab=open" id="intro">
			<h1 class="mb-4 col-12 main-heading display-5">Semi Autonomous Driving using Traffic Signs and Collision
				Avoidance</h1>
			<img src="images/bot_image.jpg" class="img-fluid offset-4 col-sm-8 offset-sm-2 mb-4"
				alt="Responsive image">
			<h5 class="col-12"><strong>Objective</strong></h5>
			<p class="col-12"> The objective of this project is to develop a semi-autonomous vehicle which can
				detect different road signals and avoid dynamic obstacles (collision avoidance).
				<mark>YOLO algorithm </mark>is used to detect the road signals and classify the detected road sign.
				Based on the classification of the road signals, perform a predefined set of instructions, and
				rotate the
				wheels to follow the desired path and perform dynamic obstacle collision avoidance using LIDAR data.
			</p><br><br>
			<h5 class="col-12"><strong>Approach</strong></h5>
			<ul class="col-12">
				<li>A dataset is created by collecting the images from the turtlebot oak-d camera with <mark>ten
						different traffic signs</mark> at different positions and orientations</li>
				<li>Bounding boxes are drawn manually around the traffic signs and labeled to be used for training
					the yolov5 model</li>
				<li>A yolov5 model is trained on the images and labels using the appropriate hyperparameters, the
					metrics are evaluated to determine the performance of the model. </li>
				<li>The yolov5 model with the best metrics is deployed on the turtlebot by subscribing to the camera
					topic "/color/preview/image". </li>
				<li>LIDAR data obtained from the turtlebot is visualized in rviz2</li>
				<li>A subscriber is used to get the LIDAR data from the "/scan" topic and narrow down the detection
					angle to face the front side of the turtlebot (30° on both cw and ccw direction).</li>
				<li>The LIDAR subscriber and yolov5 model are deployed together along with the motion control
					program to achieve semi autonomous driving</li>
			</ul><br><br>
			<h5 class="col-12"><strong>Workflow</strong></h5>
			<p class="col-12">The workflow of our project is shown in the flowchart below.</p>
			<img src="images/Turtlebot4_2.png" class="img-fluid offset-4 col-sm-8 offset-sm-2 mb-4"
				alt="Responsive image"><br><br>
			<ul class="col-12">
				<li>Subscribe to the camera topic "/color/preview/image" and send it to the yolov5 model to draw the
					bounding box and predict the output class of the image</li>
				<li>The predicted output is sent as a topic named "/pred" to the controller node which controls the
					velocity of turtlebot using "/cmd_vel" </li>
				<li>Simultaneously another subscriber subscribes to the LIDAR topic "/scan". </li>
				<li>The node also narrows the lidar data to some angle, performs operations based on a given
					distance condtion and sends back a single boolean value to check for obstacles in front of the
					robot.</li>
				<li>A controller node subscribes to the topics "/pred" and "/laser_avoid and uses the velocity topic
					"/cmd_vel" to send linear velocity commands and the action lib
					"irobot_create_msgs/action/RotateAngle" to rotate the bot for a given angle </li>
			</ul>
		</div>`
		case 'data':
			return `<div class="row tab=open" id="DataCollection" >
			<h1 class="mb-4 col-12 main-heading display-5">Data Collection</h1>
			<h5 class="col-12"><strong>YOLOv5</strong></h5>
			<p class="col-12">YOLO is a popular object detection and classification algorithm. It is very fast and
				efficient in detecting and classifying objects. YOLO is developed using pytorch and hence it is
				easier to implement the algorithm in pytorch rather than tensorflow and keras
				. Yolov5 (yolo version 5) is used in this project . There are also different versions of yolov5 as
				shown in the image
			</p>
			<img src="images/yolo_versions.jpg" class="img-fluid offset-4 col-sm-8 offset-sm-2 mb-4"
				alt="Responsive image"><br><br>
			<h5 class="col-12"><strong>Creating a Dataset</strong></h5>
			<p class="col-12">The images are captured from the turtlebot4 oak-d camera. A subscriber node is used to subscribe to the "/color/preview/image" topic, convert the data from ros image format to opencv format and use the cv2.imwrite() function to save the image. <a href="">Here</a> is the link for the image subscribe and save node. </p>
			<p class="col-12">The dataset consists of 1800 images for training and 200 images for validation, equally distributed among the 10 classes of traffic signs, shown in the image below.</p>
			<img src="images/classes.png" class="img-fluid offset-4 col-sm-6 offset-sm-2 mb-4"
				alt="Responsive image"><br><br>	
		</div>`
		default:
			return ""

	}
}
