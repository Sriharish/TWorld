//Control visibility of member functions with closure
//Globe Renderer
$( document ).ready(function() {

    var webglEl = document.getElementById('globe');

    if (!Detector.webgl) {
        Detector.addGetWebGLMessage(webglEl);
        return;
    }

    var width = window.innerWidth,
		height = window.innerHeight;

    // Earth params
    var radius = 2.5,
		segments = 32,
		rotation = 23.5;


    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(65, width / height, 0.01, 100);
    camera.position.z = 10;
    camera.minPolarAngle = (3*Math.PI)/2
    camera.maxPolarAngle = Math.PI/2; // radians
    
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth * (.75), window.innerHeight * (.75));

    scene.add(new THREE.AmbientLight(0x333333));
    //general directional lights
    var light1 = new THREE.DirectionalLight(0xffffff, 0.25);
    light1.position.set(10, 3, 10);
    scene.add(light1);
    
    var light2 = new THREE.DirectionalLight(0xffffff, 0.25);
    light2.position.set(-10,3,10);
    scene.add(light2);
    
    var light3 = new THREE.DirectionalLight(0xffffff, 0.25);
    light3.position.set(-10,3,-10);
    scene.add(light3);
    
    var light4 = new THREE.DirectionalLight(0xffffff, 0.25);
    light4.position.set(10, 3, 10);
    scene.add(light4);
    
    var sphere = createSphere(radius, segments);
    sphere.rotation.y = rotation;
    sphere.rotation.x = rotation;
    scene.add(sphere)

    var controls = new THREE.TrackballControls(camera);
    //to limit rotation of the earth and add controls to object view.
    controls.target.set(0,0,0);
    controls.minDistance = 3.0;
    controls.maxDistance = 10;
    

    webglEl.appendChild(renderer.domElement);

    render();

    THREE.ImageUtils.crossOrigin = '';

    function render() {
        controls.update();
        sphere.rotation.y += 0.0005;
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    function createSphere(radius, segments) {
        return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
			    map: THREE.ImageUtils.loadTexture('./images/2_no_clouds_4k.jpg'),
			    //bumpMap: THREE.ImageUtils.loadTexture('./images/elev_bump_4k.jpg'),
			    //bumpScale: 0.005,
			    //specularMap: THREE.ImageUtils.loadTexture('./images/water_4k.png'),
			    specular: new THREE.Color('grey')
			})
		);
    }
    /*
    function createClouds(radius, segments) {
        return new THREE.Mesh(
			new THREE.SphereGeometry(radius + 0.003, segments, segments),
			new THREE.MeshPhongMaterial({
			    map: THREE.ImageUtils.loadTexture('./images/fair_clouds_4k.png'),
			    transparent: true
			})
		);
    }*/
    /*
    function createStars(radius, segments) {
        return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshBasicMaterial({
			    map: THREE.ImageUtils.loadTexture('./images/galaxy_starfield.png'),
			    side: THREE.BackSide
			})
		);
    }*/


});