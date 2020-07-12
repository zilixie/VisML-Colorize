# VisML: Image Colorization
This project introduces a visualization tool for visualizing the internal of Covolutional Neural Network model. The model for visualization was trained on the intel-image-classification & 100-bird-species datasets for 400 epochs on Google's colab.
<p float="left">
  <img src="https://github.com/zilixie/VisML-Colorize/blob/master/resources/act0/target.jpg" width="120" />
  <img src="https://github.com/zilixie/VisML-Colorize/blob/master/resources/act0/predict.jpg" width="120" /> 
  <img src="https://github.com/zilixie/VisML-Colorize/blob/master/resources/act1/target.jpg" width="120" />
  <img src="https://github.com/zilixie/VisML-Colorize/blob/master/resources/act1/predict.jpg" width="120" /> 
  <img src="https://github.com/zilixie/VisML-Colorize/blob/master/resources/act2/target.jpg" width="120" />
  <img src="https://github.com/zilixie/VisML-Colorize/blob/master/resources/act2/predict.jpg" width="120" /> 
  <img src="https://github.com/zilixie/VisML-Colorize/blob/master/resources/act3/target.jpg" width="120" />
  <img src="https://github.com/zilixie/VisML-Colorize/blob/master/resources/act3/predict.jpg" width="120" /> 
</p>
<p float="left">
  <img src="https://github.com/zilixie/VisML-Colorize/blob/master/resources/act5/target.jpg" width="120" />
  <img src="https://github.com/zilixie/VisML-Colorize/blob/master/resources/act5/predict.jpg" width="120" /> 
  <img src="https://github.com/zilixie/VisML-Colorize/blob/master/resources/act7/target.jpg" width="120" />
  <img src="https://github.com/zilixie/VisML-Colorize/blob/master/resources/act7/predict.jpg" width="120" /> 
  <img src="https://github.com/zilixie/VisML-Colorize/blob/master/resources/act8/target.jpg" width="120" />
  <img src="https://github.com/zilixie/VisML-Colorize/blob/master/resources/act8/predict.jpg" width="120" /> 
  <img src="https://github.com/zilixie/VisML-Colorize/blob/master/resources/act9/target.jpg" width="120" />
  <img src="https://github.com/zilixie/VisML-Colorize/blob/master/resources/act9/predict.jpg" width="120" /> 
</p>
<p float="left">
  <img src="https://github.com/zilixie/VisML-Colorize/blob/master/images/target.jpg" width="120" />
  <img src="https://github.com/zilixie/VisML-Colorize/blob/master/images/predict.jpg" width="120" /> 
</p>
<p align="center">target & prediction on test set</p>

## Structure
<p align="center">
<img src="https://github.com/zilixie/VisML-Colorize/blob/master/images/Screen%20Shot%202020-07-12%20at%2010.42.11%20PM.png" width="240">
</p>
<p align="center">structure of network</p>

The model I use for this project can be referenced from the work done by R. Zhang et al. in 2016. The network structure contains 9 conv layers, where each conv layer refers to 2 or 3 consecutive conv2d and ReLU layers followed by BatchNorm. The network dimensions can be shown as the graph on the left side. The last layer of the networks gives the prediction over all the possible color classes with a 56 by 56 array. The Final output can be computed by upsampling this array to the origin size of image.  
The model is trained using a special loss function called color-rebalancing. It is defined as a weighted cross-entropy function where the weight of each class (a,b pairs) can be interpreted as the inverse of the probability of occurrence of each color. The more frequently a color occurs in the images, the less weight it will get. Thus, this model gets more rewards on choosing rare colors when there are multiple choices of color.

<img src="https://github.com/zilixie/VisML-Colorize/blob/master/images/Screen%20Shot%202020-07-13%20at%201.08.02%20AM.png" width="360">

Q stands for the number of color classes in the datasets, and λ is a tuning parameter that ranges between [0,1]. The more it is close to 1 the less of original probability p ̃ is taken into consideration. 

## Color Maps
<p align="center">
<img src="https://github.com/zilixie/VisML-Colorize/blob/master/images/Screen%20Shot%202020-07-12%20at%2010.42.48%20PM.png" width="960"></p>
<p align="center">distribution of colors over all the possible ab-bins </p>

## Accuracies over epochs
<p align="center">
<img src="https://github.com/zilixie/VisML-Colorize/blob/master/images/Screen%20Shot%202020-07-12%20at%2010.43.24%20PM.png" width="640"></p>
<p align="center">accuracies over epochs and categories </p>

## Main Page
The top part of this dashboard is a scrollable div where users can select the image that they want to see the activation. The input/output view will give user a quick comparison on the target image and predicted image by our model, along with the range of color, and L channel histogram.
<p align="center">
<img src="https://github.com/zilixie/VisML-Colorize/blob/master/images/Screen%20Shot%202020-07-12%20at%2010.44.04%20PM.png" width="640"></p>
<p align="center">Visualization of Model Activation </p>  

In vertical axis, user can quickly switch between visualizations of different convolutional layers by moving mouse over the layer structure. Conv1 to Conv7 has a similar view. On right side is the average activation in each conv filter and on the left side is the actual activations.
<p align="center">
<img src="https://github.com/zilixie/VisML-Colorize/blob/master/images/Screen%20Shot%202020-07-12%20at%2010.45.57%20PM.png" width="640"></p>
<p align="center">Visualization of conv1-conv7 Layers </p>  

The last layer will be the prediction layer. Users can inspect the pixel-level prediction by moving the mouse over the target image.
<p align="center">
<img src="https://github.com/zilixie/VisML-Colorize/blob/master/images/Screen%20Shot%202020-07-12%20at%2010.44.59%20PM.png" width="640"></p>
<p align="center">Visualization of the last Layers </p>  
