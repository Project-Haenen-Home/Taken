<template>
    <div class="container">
        <div class="loader"></div>
        <div class="txt">loading</div>
    </div>
</template>

<script>
export default {
    name: "loader"
}
</script>

<style lang="scss" scoped>
    *, *:before, *:after {
        box-sizing: border-box;
    }

    $animation-duration: 1.6s;

    .container {
        position: relative;
        width: 121px;
        height: 80px;
        display: flex;
        justify-content: center;
    }

    .loader {
        position: absolute;
        top: 20px;
        left: 30px;
        width: 50px;
        height: 10px;
        background: dodgerblue;
        border-radius: 5px;
        animation: load $animation-duration ease-in-out infinite; 
        
        &:before, &:after {
            position: absolute; 
            display: block;
            content: "";
            animation: load $animation-duration ease-in-out infinite;
            height: 10px;
            border-radius: 5px;
        }

        &:before {
            top: -20px;
            left: 10px;
            width: 40px;
            background: dodgerblue;
        }

        &:after {
            bottom: -20px;
            width: 35px;
            background: dodgerblue; 
        }
    }

    .txt {
        position: absolute;
        bottom: 0px;
    }

    @keyframes load {
        0% {
            transform: translateX(20px);
        }
        
        50% {
            transform: translateX(-15px);
        }
        100% {
            transform: translateX(20px);
        }
    }
</style>