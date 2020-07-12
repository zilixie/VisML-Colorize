# VisML: Image Colorization
This project introduces a visualization tool for visualizing the internal of Covolutional Neural Network model. The model for visualization was trained on the intel-image-classification & 100-bird-species datasets for 400 epochs on Google's colab.
<p float="left">
  <img src="https://github.com/zilixie/VisML-Colorize/blob/master/resources/act0/target.jpg" width="100" />
  <img src="https://github.com/zilixie/VisML-Colorize/blob/master/resources/act0/predict.jpg" width="100" /> 
</p>
<p float="left">
  <img src="https://github.com/zilixie/VisML-Colorize/blob/master/resources/act0/target.jpg" width="100" />
  <img src="https://github.com/zilixie/VisML-Colorize/blob/master/resources/act0/predict.jpg" width="100" /> 
</p>

<p align="center">
<img src="https://github.com/zilixie/VisML-Colorize/blob/master/images/Screen%20Shot%202020-07-12%20at%2010.42.11%20PM.png" width="240">
</p>

The model we use for this project can be referenced from the work done by R. Zhang et al. in 2016. The network structure contains 9 conv layers, where each conv layer refers to 2 or 3 consecutive conv2d and ReLU layers followed by BatchNorm. The network dimensions can be shown as the graph on the left side. The last layer of the networks gives the prediction over all the possible color classes with a 56 by 56 array. The Final output can be computed by upsampling this array to the origin size of image.

<img src="https://github.com/zilixie/VisML-Colorize/blob/master/images/Screen%20Shot%202020-07-12%20at%2010.42.48%20PM.png">
<p align="center">distribution of colors over all the possible ab-bins </p>
