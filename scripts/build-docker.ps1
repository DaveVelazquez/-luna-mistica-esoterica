param(
    [string]$region = 'us-east-1',
    [string]$repoName = 'luna-mistica',
    [string]$tag = 'latest'
)

Write-Host "Building Docker image..."
docker build -t $repoName:$tag .

$accountId = (aws sts get-caller-identity --query Account --output text --region $region)
if (-not $accountId) {
    Write-Error "Unable to determine AWS account. Run 'aws configure' first."
    exit 1
}

$ecrUri = "$accountId.dkr.ecr.$region.amazonaws.com/$repoName"

Write-Host "Logging in to ECR..."
aws ecr get-login-password --region $region | docker login --username AWS --password-stdin $accountId.dkr.ecr.$region.amazonaws.com

Write-Host "Checking/creating repository $repoName..."
try {
    aws ecr describe-repositories --repository-names $repoName --region $region | Out-Null
} catch {
    aws ecr create-repository --repository-name $repoName --region $region | Out-Null
}

Write-Host "Tagging and pushing image to ECR: $ecrUri:$tag"
docker tag $repoName:$tag $ecrUri:$tag
docker push $ecrUri:$tag

Write-Host "Done. Image available at $ecrUri:$tag"
