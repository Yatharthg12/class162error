AFRAME.registerComponent("bullets",{
    init: function(){
        this.shootbullet()
    },

    shootbullet: function(){
        window.addEventListener("keydown",(e)=>{
            if(e.key == "z"){
                var bullet = document.createElement("a-entity")
                bullet.setAttribute("geometry",{
                    primitive: "sphere",
                    radius: 0.1
                })
                bullet.setAttribute("material","color","black")
                var camera = document.querySelector("#camera")
                pos = camera.getAttribute("position")
                bullet.setAttribute("position",{
                    x: pos.x,
                    y: pos.y,
                    z: pos.z
                })
                var cam = document.querySelector("#camera").object3D
                var direction = new THREE.Vector3()
                cam.getWorldDirection(direction)
                bullet.setAttribute("velocity",direction.multiplyScalar(-10))
                var scene = document.querySelector("#scene")
                bullet.setAttribute("dynamic-body",{
                    shape: "sphere",
                    mass: "0"
                })
                bullet.addEventListener("collide",this.removeBullet)
                scene.appendChild(bullet)
            }
        })
    },

    removeBullet: function (e) {
        //Original entity (bullet)
        console.log(e.detail.target.el);
    
        //Other entity, which bullet touched.
        console.log(e.detail.body.el);
    
        //bullet element
        var element = e.detail.target.el;
    
        //element which is hit
        var elementHit = e.detail.body.el;
    
        if (elementHit.id.includes("box")) {
          elementHit.setAttribute("material", {
            opacity: 1,
            transparent: true,
          });
    
          //impulse and point vector
          var impulse = new CANNON.Vec3(-2, 2, 1);
          var worldPoint = new CANNON.Vec3().copy(
            elementHit.getAttribute("position")
          );
    
          elementHit.body.applyImpulse(impulse, worldPoint);
    
          //remove event listener
          element.removeEventListener("collide", this.shootbullet);
    
          //remove the bullets from the scene
          var scene = document.querySelector("#scene");
          scene.removeChild(element);
        }
      },
})